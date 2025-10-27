import hashlib
import shutil
import tempfile
import uuid
import zipfile
from http.client import HTTPException
from pathlib import Path, PurePosixPath
from typing import List

from app import settings
from app.src.files.application.automatic.exceptions import (
    InvalidFilesError,
    InvalidZipAbsolutePathError,
    InvalidZipPathError,
    UploadedLargeFileError,
    ZipExtractError,
)
from app.src.files.domain.entities.file_entity import FileEntity
from app.src.files.domain.repositories.file_repository import FileRepository
from fastapi import UploadFile


class AutomaticFileService:
    def __init__(self, repository: FileRepository):
        self.repository = repository
        # TODO: change this logic to a docker volume on production
        self.storage_path = (
            Path(__file__).resolve().parents[4] / settings.application.storage_path
        )
        self.max_size = settings.application.max_file_size

    async def execute(self, job_id: str, new_zip_file: UploadFile) -> list[str]:
        # creates path for incoming files
        job_path = self._build_job_path(job_id)

        # Save zip outside the extraction folder to avoid self-validation later
        zip_filename = Path(new_zip_file.filename).name
        zip_path = job_path / f"{uuid.uuid4().hex}_{zip_filename}"
        await self._save_file(new_zip_file, zip_path)

        # Create an extraction temp dir (under job_path for easier cleanup/permission)
        tmp_dir = Path(tempfile.mkdtemp(prefix="_tmp_extract_", dir=job_path))

        try:
            # Extract safely into tmp_dir
            try:
                self._safe_extract_zip(zip_path, tmp_dir)
            except (
                InvalidZipAbsolutePathError,
                InvalidZipPathError,
                zipfile.BadZipFile,
            ):
                raise ZipExtractError()

            # gather extracted files (only files)
            extracted_files = [p for p in tmp_dir.rglob("*") if p.is_file()]

            # Build list of relative posix paths (before strip)
            rels = [p.relative_to(tmp_dir).as_posix() for p in extracted_files]

            # strip common single-root directory if exists
            stripped_rels = self._strip_common_root_if_any(rels)

            # Map original Path -> stripped_rel
            path_to_rel = {p: stripped_rels[i] for i, p in enumerate(extracted_files)}

            invalids = []
            metadata_list = []
            for src_path, rel in path_to_rel.items():
                ok, err = self._validate_structure_for_file(rel)
                if not ok:
                    invalids.append({"file": rel, "reason": err})
                    continue

                dest = job_path / rel
                dest.parent.mkdir(parents=True, exist_ok=True)

                # move atomically if possible
                try:
                    shutil.move(str(src_path), str(dest))
                except HTTPException as e:
                    # fallback: copy then remove
                    shutil.copy2(str(src_path), str(dest))
                    src_path.unlink()

                # checksum and size
                with dest.open("rb") as fh:
                    checksum = self._sha256_of_stream(fh)
                    size = dest.stat().st_size

                path_parts = PurePosixPath(rel).parts[:]
                metadata_list.append(
                    {
                        "job_id": job_id,
                        "path": rel,
                        "family": path_parts[0],
                        "variant": path_parts[1],
                        "software": path_parts[2],
                        "functional": path_parts[3],
                        "filename": path_parts[4],
                        "checksum": checksum,
                        "size": size,
                    }
                )

            # cleanup: remove zip and tmp_dir
            try:
                if zip_path.exists():
                    zip_path.unlink()
                shutil.rmtree(tmp_dir, ignore_errors=True)
            except HTTPException:
                # ignore cleanup errors
                pass

            if invalids:
                # revert moved files in this job
                for md in metadata_list:
                    p = job_path / md["relative_path"]
                    try:
                        if p.exists():
                            p.unlink()
                    except HTTPException:
                        pass
                raise InvalidFilesError()

            # convert to entity and save to database
            files_entities = [FileEntity(**item) for item in metadata_list]
            return await self.repository.create_massive(files=files_entities)

        finally:
            # last-ditch cleanup (if not already removed)
            try:
                if tmp_dir.exists():
                    shutil.rmtree(tmp_dir, ignore_errors=True)
            except HTTPException:
                pass

    async def _save_file(self, file: UploadFile, storage_path: Path) -> int:
        """Save an UploadFile / stream on storage path secure :returns: file
        size on bytes."""
        storage_path.parent.mkdir(parents=True, exist_ok=True)
        size: int = 0

        with storage_path.open("wb") as f:
            while True:
                chunk = await file.read(1 * 1024 * 1024)
                if not chunk:
                    break

                f.write(chunk)
                size += len(chunk)

                if size > self.max_size:
                    raise UploadedLargeFileError()

        await file.close()
        return size

    def _build_job_path(self, job_id: str) -> Path:
        """Make the initial job path."""
        p = self.storage_path / job_id
        p.mkdir(parents=True, exist_ok=True)
        return p

    @classmethod
    def _sha256_of_stream(cls, file_obj, chunk_size=65536):
        """Function for calculate checksum token.

        notes:
        - checksum is for create a digital fingerprint of file,
        - if there is two files, u just need to see checksum
        """
        h = hashlib.sha256()
        file_obj.seek(0)

        while True:
            chunk = file_obj.read(chunk_size)
            if not chunk:
                break
            h.update(chunk)
        file_obj.seek(0)

        return h.hexdigest()

    @classmethod
    def _safe_extract_zip(cls, zip_path: Path, extract_to: Path):
        """Extract safely by preventing zip slip (route travel)."""
        with zipfile.ZipFile(zip_path, "r") as z:
            for member in z.namelist():
                member_path = PurePosixPath(member)
                if member_path.is_absolute():
                    raise InvalidZipAbsolutePathError()
                if any(part == ".." for part in member_path.parts):
                    raise InvalidZipPathError()

            z.extractall(path=str(extract_to))

    @classmethod
    def _list_extracted_files(cls, root: Path) -> List[Path]:
        """List all extracted files in root directory."""
        return [p for p in root.rglob("*") if p.is_file()]

    @classmethod
    def _validate_structure_for_file(cls, relative_posix_path: str):
        """
        validate that the relative path follows:
            - Family/Variant/Functional/Software/file.ext
        requires at least 5 segments (the first 4 must not be empty).
        """
        p = PurePosixPath(relative_posix_path)
        parts = p.parts

        if len(parts) < 5:
            return (
                False,
                f"Ruta inválida (esperado >=5 segmentos). Obtenido: {len(parts)} -> {relative_posix_path}",
            )

        for seg in parts[:-1]:
            if not seg or seg.strip() == "":
                return False, "Segmento vacío en la ruta"
            if seg in (".", ".."):
                return False, "Segmento inválido en la ruta"

        return True, None

    @classmethod
    def _strip_common_root_if_any(cls, rel_paths: List[str]) -> List[str]:
        """If all rel_paths share the same first segment (a single top-level
        folder), remove that first segment for validation/movement.

        Returns the new list.
        """
        if not rel_paths:
            return rel_paths

        first_segments = [
            PurePosixPath(p).parts[0] if PurePosixPath(p).parts else ""
            for p in rel_paths
        ]
        if all(s == first_segments[0] and s != "" for s in first_segments):
            # strip first segment
            return [
                PurePosixPath(*PurePosixPath(p).parts[1:]).as_posix() for p in rel_paths
            ]
        return rel_paths
