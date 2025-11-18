from typing import List, Optional

from app.elemental.exceptions.infrastructure.database import DatabaseError
from app.src.analysis.domain.entities.mae_general_entity import MAEGeneralEntity
from app.src.analysis.domain.repositories.mae_general_repository import (
    MAEGeneralRepository,
)
from app.src.analysis.infrastructure.models.mae_general_model import MAEGeneralModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class MAEGeneralRepositorySQL(MAEGeneralRepository):
    """MAEGeneral Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=MAEGeneralModelSQL, session=session)

    async def create(self, mae: MAEGeneralEntity) -> MAEGeneralEntity:
        mae = self.model(**mae.model_dump())
        await self._create(mae)
        return MAEGeneralEntity(**mae.model_dump())

    async def create_massive(
        self, mae_list: List[MAEGeneralEntity]
    ) -> List[MAEGeneralEntity]:
        records_bulk = [item.model_dump() for item in mae_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_by_report_id(self, report_id: str) -> Optional[MAEGeneralEntity]:
        records_model = await self._get_one_by(key="report_id", value=report_id)

        if not records_model:
            raise DatabaseError(f"Report id {report_id} not found")

        return MAEGeneralEntity(**records_model.model_dump())
