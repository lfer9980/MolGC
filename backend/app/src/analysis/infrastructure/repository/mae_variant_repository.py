from typing import List

from app.src.analysis.domain.entities.mae_variant_entity import MAEVariantEntity
from app.src.analysis.domain.repositories.mae_variant_repository import (
    MAEVariantRepository,
)
from app.src.analysis.infrastructure.models.mae_variant_model import MAEVariantModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class MAEVariantRepositorySQL(MAEVariantRepository):
    """MAEVariant Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=MAEVariantModelSQL, session=session)

    async def create(self, mae: MAEVariantEntity) -> MAEVariantEntity:
        mae_model = self.model(**mae.model_dump())
        await self._create(mae_model)
        return MAEVariantEntity(**mae_model.model_dump())

    async def create_massive(
        self, mae_list: List[MAEVariantEntity]
    ) -> List[MAEVariantEntity]:
        records_bulk = [item.model_dump() for item in mae_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_all_by_id(self, report_id: str) -> List[MAEVariantEntity]:
        records_model = await self._get_all_by(key="report_id", value=report_id)
        return [MAEVariantEntity(**item.model_dump()) for item in records_model]
