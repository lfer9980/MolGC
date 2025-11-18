from datetime import datetime, timedelta, timezone

from app import settings
from app.src.jobs.domain.entities.cleanup_entity import CleanupEntity
from app.src.jobs.domain.repositories.cleanup_repository import CleanupRepository


class CreateCleanupService:
    def __init__(self, repository: CleanupRepository):
        self.repository = repository
        self.expiration_hours = settings.jwt.access_token_expire_hours

    async def execute(self, job_id: str) -> CleanupEntity:
        cleanup_data = CleanupEntity(
            job_id=job_id,
            scheduled_at=self._calculate_scheduled(),
        )

        return await self.repository.create(cleanup_data)

    def _calculate_scheduled(self):
        """
        Business rule: each session lasts 24 hours from the time it is created.
        Always use UTC to avoid time zone issues.
        """
        return datetime.now(timezone.utc) + timedelta(minutes=1)
