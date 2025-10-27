from typing import Optional

from app.src.analysis.domain.entities.mae_family_entity import MAEFamilyEntity
from app.src.analysis.domain.repositories.mae_family_repository import (
    MAEFamilyRepository,
)


class GetByIDMAEFamilyService:
    def __init__(self, repository: MAEFamilyRepository):
        self.repository = repository

    async def execute(self, report_id: str) -> Optional[MAEFamilyEntity]:
        """Get report by ID."""
        return await self.repository.get_by_report_id(report_id)
