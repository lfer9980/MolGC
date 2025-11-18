from typing import List

from app.src.jobs.domain.entities.cleanup_entity import CleanupEntity
from app.src.jobs.domain.repositories.cleanup_repository import CleanupRepository


class GetDueCleanupService:
    def __init__(self, repository: CleanupRepository):
        self.repository = repository

    async def execute(self) -> List[CleanupEntity]:
        return await self.repository.get_due_cleanups()
