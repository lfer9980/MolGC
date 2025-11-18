from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.exceptions import JobNotFoundError
from app.src.jobs.domain.entities.job_entity import JobEntity
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from sqlalchemy.ext.asyncio import AsyncSession


class UpdateJobService:
    @staticmethod
    async def execute(
        session: AsyncSession, job_id: str, new_data: UpdateJobDTO
    ) -> JobEntity:
        """Service for update Jobs :param session: database session :param
        job_id: id of the job :param new_data: new data."""
        # define repository
        repository = JobRepositorySQL(session)

        # validate & obtains if job exists (just in case)
        job_entity = await repository.get_by_id(job_id)
        if job_entity is None:
            raise JobNotFoundError()

        # update from job founded
        for key, value in new_data.model_dump(exclude_none=True).items():
            if key in job_entity.model_dump():
                setattr(job_entity, key, value)

        # save changes
        return await repository.update(job_entity)
