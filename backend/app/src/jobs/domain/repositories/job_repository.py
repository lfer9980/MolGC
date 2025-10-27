from abc import abstractmethod
from typing import List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.jobs.domain.entities.job_entity import JobEntity


class JobRepository(ElementalRepository):
    """Job Repository definition."""

    @abstractmethod
    async def create(self, job: JobEntity) -> JobEntity:
        pass

    @abstractmethod
    async def update(self, job: JobEntity) -> Optional[JobEntity]:
        pass

    @abstractmethod
    async def delete(self, job_id: str) -> Optional[JobEntity]:
        pass

    @abstractmethod
    async def delete_massive(self, job_list: List[str]) -> int:
        pass

    @abstractmethod
    async def get_by_id(self, job_id: str) -> Optional[JobEntity]:
        pass
