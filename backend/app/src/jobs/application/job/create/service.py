from datetime import datetime, timedelta, timezone

from app import settings
from app.src.jobs.application.cleanup.create.service import CreateCleanupService
from app.src.jobs.application.job.create.dto import CreateJobDTO
from app.src.jobs.domain.entities.job_entity import JobEntity
from app.src.jobs.domain.enums import JobStatusEnum
from app.src.jobs.domain.repositories.cleanup_repository import CleanupRepository
from app.src.jobs.domain.repositories.job_repository import JobRepository


class CreateJobService:
    def __init__(
        self, repository: JobRepository, cleanup_repository: CleanupRepository
    ):
        self.repository = repository
        self.cleanup_repository = cleanup_repository
        self.expiration_hours = settings.jwt.access_token_expire_hours

    async def execute(self, new_data: CreateJobDTO) -> JobEntity:
        upload_type = new_data.upload_type

        job_data = JobEntity(
            analysis_type=None,
            upload_type=upload_type,
            status=JobStatusEnum.UPLOAD_PENDING,
            reference=None,
            expires_at=self._calculate_expiration(),
            updated_at=None,
        )

        job_entity = await self.repository.create(job_data)

        cleanup_service = CreateCleanupService(self.cleanup_repository)
        await cleanup_service.execute(job_entity.id)

        return job_entity

    def _calculate_expiration(self):
        """
        Business rule: each session lasts 24 hours from the time it is created.
        Always use UTC to avoid time zone issues.
        """
        return datetime.now(timezone.utc) + timedelta(hours=self.expiration_hours)
