from app.src.jobs.domain.entities.job_entity import JobEntity
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from sqlalchemy.ext.asyncio import AsyncSession

from .exceptions import InvalidJobIDError


class ValidateJobService:
    @staticmethod
    async def execute(session: AsyncSession, job_id: str) -> JobEntity:
        """Service for validate Jobs :param session: database session :param
        job_id: id of the job."""
        repository = JobRepositorySQL(session)

        job_entity = await repository.get_by_id(job_id)

        # validates if Job does not exist
        if not job_entity:
            raise InvalidJobIDError()

        return job_entity
