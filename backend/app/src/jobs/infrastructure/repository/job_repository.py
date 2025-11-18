from typing import List, Optional

from app.elemental.exceptions.infrastructure.database import DatabaseError
from app.src.jobs.domain.entities.job_entity import JobEntity
from app.src.jobs.domain.repositories.job_repository import JobRepository
from app.src.jobs.infrastructure.models.job_model import JobModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class JobRepositorySQL(JobRepository):
    """Job Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=JobModelSQL, session=session)

    async def create(self, job: JobEntity) -> JobEntity:
        job_model = self.model(**job.model_dump())
        await self._create(job_model)
        return JobEntity(**job_model.model_dump())

    async def update(self, job: JobEntity) -> Optional[JobEntity]:
        # obtain persistent instance from job table
        job_instance = await self._get_by_id(job.id)
        if not job_instance:
            raise DatabaseError(message="Instance not found in DB")

        # update job_instance
        for key, value in job.model_dump().items():
            if hasattr(job_instance, key):
                setattr(job_instance, key, value)

        updated_job = await self._update(job_instance)
        return JobEntity(**updated_job.model_dump())

    async def delete(self, job_id: str) -> Optional[JobEntity]:
        # obtain persistent instance from job table
        job_instance = await self._get_by_id(job_id)
        if not job_instance:
            raise DatabaseError("Instance not found in DB")

        return await self._delete(job_instance)

    async def delete_massive(self, job_id_list: List[str]) -> int:
        return await self._bulk_delete(job_id_list)

    async def get_by_id(self, job_id: str) -> Optional[JobEntity]:
        job_model = await self._get_by_id(job_id)

        if not job_model:
            return None

        return JobEntity(**job_model.model_dump())
