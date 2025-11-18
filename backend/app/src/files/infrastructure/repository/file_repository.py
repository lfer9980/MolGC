from pathlib import Path
from typing import List, Optional

from app.src.files.domain.entities.file_entity import FileEntity
from app.src.files.domain.repositories.file_repository import FileRepository
from app.src.files.infrastructure.models.file_model import FileModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class FileRepositorySQL(FileRepository):
    """File Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=FileModelSQL, session=session)

    async def create(self, file: FileEntity) -> FileEntity:
        """Create new file."""
        file_model = self.model(**file.model_dump())
        await self._create(file_model)
        return FileEntity(**file_model.model_dump())

    async def create_massive(self, files: List[FileEntity]) -> list[str]:
        """Create new files."""
        records_bulk = [file.model_dump() for file in files]
        saved_files = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_files

    async def update(self, file: FileEntity) -> FileEntity:
        """Update file."""
        file_model = self.model(**file.model_dump())
        await self._update(file_model)
        return FileEntity(**file_model.model_dump())

    async def get_by_path(self, path: Path) -> Optional[FileEntity]:
        """Get file by path."""
        path_str = str(path)
        file_model = await self._get_one_by(key="path", value=path_str)

        if not file_model:
            return None

        return FileEntity(**file_model.model_dump())

    async def get_by_job_id(self, job_id: str) -> Optional[List[FileEntity]]:
        """Get file by session id."""
        files_models = await self._filter_by(key="job_id", value=job_id)

        if len(files_models) <= 0:
            return None

        return [FileEntity(**file.model_dump()) for file in files_models]
