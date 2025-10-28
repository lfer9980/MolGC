import os
import hashlib
from pathlib import Path

from app import settings
from app.src.files.application.manual.dto import ClassificationFileDTO
from app.src.files.application.manual.exceptions import (
    FileAlreadyExistsError,
    UploadedLargeFileError,
)
from app.src.files.domain.entities.file_entity import FileEntity
from app.src.files.domain.repositories.file_repository import FileRepository
from fastapi import UploadFile


class ManualFileService:
    def __init__(self, repository: FileRepository):
        self.repository = repository
        self.storage_path = (
            Path(__file__).resolve().parent.parent.parent.parent.parent
            / settings.application.storage_path
        ) if not os.getenv("STORAGE_PATH") else Path(os.getenv("STORAGE_PATH"))
        self.max_size = settings.application.max_file_size

    async def execute(
        self, new_file: UploadFile, classification: ClassificationFileDTO, job_id: str
    ) -> FileEntity:

        # creates path for incoming files
        job_path = self._build_job_id(job_id)
        save_dir = self._build_dest_path(classification, job_path)

        # save file securely
        filename = Path(new_file.filename).name
        save_path = save_dir / filename

        # verify if there is a file registered on DB|
        existing_file = await self.repository.get_by_path(save_path)

        # saves file and return size
        file_size = await self._save_file(new_file, save_path)

        # calculates checksum
        with save_path.open("rb") as f:
            new_checksum = self._sha256_of_stream(f)

        # check if the files already exists and  it is not the same
        if existing_file:
            if existing_file.checksum == new_checksum:
                raise FileAlreadyExistsError()

            else:
                existing_file.checksum = new_checksum
                existing_file.size = file_size
                return await self.repository.update(existing_file)

        file_data = FileEntity(
            job_id=job_id,
            path=str(save_path),
            family=classification.family,
            variant=classification.variant,
            software=classification.software,
            functional=classification.functional,
            filename=filename,
            checksum=new_checksum,
            size=file_size,
        )

        return await self.repository.create(file=file_data)

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

    def _build_job_id(self, job_id: str) -> Path:
        """Make the initial session path."""
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
    def _build_dest_path(cls, dto: ClassificationFileDTO, path: Path) -> Path:
        """Builds a path from the DTO attributes."""
        p = path / dto.family / dto.variant / dto.software / dto.functional
        p.mkdir(parents=True, exist_ok=True)
        return p
