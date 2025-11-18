from typing import List, Optional

from app.src.analysis.domain.entities.structure_entity import StructureEntity
from app.src.analysis.domain.repositories.structure_repository import (
    StructureRepository,
)


class GetByIDStructureService:
    def __init__(self, repository: StructureRepository):
        self.repository = repository

    async def execute(self, report_id: str) -> Optional[StructureEntity]:
        """Get report by ID."""
        return await self.repository.get_by_report_id(report_id)
