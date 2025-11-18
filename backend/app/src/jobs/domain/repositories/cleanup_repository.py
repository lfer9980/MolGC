from abc import abstractmethod
from typing import List

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.jobs.domain.entities.cleanup_entity import CleanupEntity


class CleanupRepository(ElementalRepository):
    """Cleanup Repository definition."""

    @abstractmethod
    async def create(self, job: CleanupEntity) -> CleanupEntity:
        pass

    @abstractmethod
    async def get_due_cleanups(self) -> List[CleanupEntity]:
        pass
