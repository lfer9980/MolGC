from typing import List, Optional

from app.elemental.exceptions.infrastructure.database import DatabaseError
from app.src.analysis.domain.entities.mae_family_entity import MAEFamilyEntity
from app.src.analysis.domain.repositories.mae_family_repository import (
    MAEFamilyRepository,
)
from app.src.analysis.infrastructure.models.mae_family_model import MAEFamilyModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class MAEFamilyRepositorySQL(MAEFamilyRepository):
    """MAEFamily Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=MAEFamilyModelSQL, session=session)

    async def create(self, mae: MAEFamilyEntity) -> MAEFamilyEntity:
        mae_model = self.model(**mae.model_dump())
        await self._create(mae_model)
        return MAEFamilyEntity(**mae_model.model_dump())

    async def create_massive(
        self, mae_list: List[MAEFamilyEntity]
    ) -> List[MAEFamilyEntity]:
        records_bulk = [item.model_dump() for item in mae_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_by_report_id(self, report_id: str) -> Optional[MAEFamilyEntity]:
        records_model = await self._get_one_by(key="report_id", value=report_id)

        if not records_model:
            raise DatabaseError(f"Report id {report_id} not found")

        return MAEFamilyEntity(**records_model.model_dump())
