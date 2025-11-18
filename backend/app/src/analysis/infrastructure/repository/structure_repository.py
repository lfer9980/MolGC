from typing import List, Optional

from app.src.analysis.domain.entities.structure_entity import StructureEntity
from app.src.analysis.domain.repositories.structure_repository import (
    StructureRepository,
)
from app.src.analysis.infrastructure.models.structure_model import StructureModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class StructureRepositorySQL(StructureRepository):
    """Structure Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=StructureModelSQL, session=session)

    async def create(self, mae: StructureEntity) -> StructureEntity:
        structure_model = self.model(**mae.model_dump())
        await self._create(structure_model)
        return StructureEntity(**structure_model.model_dump())

    async def create_massive(
        self, structure_list: List[StructureEntity]
    ) -> List[StructureEntity]:
        records_bulk = [item.model_dump() for item in structure_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_by_report_id(self, report_id: str) -> Optional[StructureEntity]:
        structure_model = await self._get_one_by(key="report_id", value=report_id)
        return StructureEntity(**structure_model.model_dump())
