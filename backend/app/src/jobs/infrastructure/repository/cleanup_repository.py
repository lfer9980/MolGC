from datetime import datetime, timezone
from typing import List

from app.src.jobs.domain.entities.cleanup_entity import CleanupEntity
from app.src.jobs.domain.repositories.cleanup_repository import CleanupRepository
from app.src.jobs.infrastructure.models.cleanup_model import CleanupModelSQL
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


class CleanupRepositorySQL(CleanupRepository):
    """Cleanup Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=CleanupModelSQL, session=session)

    async def create(self, job: CleanupEntity) -> CleanupEntity:
        job_model = self.model(**job.model_dump())
        await self._create(job_model)
        return CleanupEntity(**job_model.model_dump())

    async def get_due_cleanups(self) -> List[CleanupEntity]:
        """Returns all due cleanups."""
        column = getattr(self.model, "scheduled_at")
        stmt = select(self.model).where(column <= datetime.now(timezone.utc))
        result = await self.session.execute(stmt)
        cleanup_list = result.scalars().all()

        return [CleanupEntity(**item.model_dump()) for item in cleanup_list]
