from abc import abstractmethod
from pathlib import Path
from typing import List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.files.domain.entities.file_entity import FileEntity


class FileRepository(ElementalRepository):
    """File Repository definition."""

    @abstractmethod
    async def create(self, file: FileEntity) -> FileEntity:
        pass

    @abstractmethod
    async def create_massive(self, files: List[FileEntity]) -> list[str]:
        pass

    @abstractmethod
    async def update(self, file: FileEntity) -> FileEntity:
        pass

    @abstractmethod
    async def get_by_path(self, path: Path) -> Optional[FileEntity]:
        pass

    @abstractmethod
    async def get_by_job_id(self, job_id: str) -> List[Optional[FileEntity]]:
        pass
