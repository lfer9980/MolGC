from typing import List

from app.src.analysis.domain.entities.topsis_entity import TopsisEntity
from app.src.analysis.domain.repositories.topsis_repository import TopsisRepository
from app.src.analysis.infrastructure.models.topsis_model import TopsisModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class TopsisRepositorySQL(TopsisRepository):
    """Topsis Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=TopsisModelSQL, session=session)

    async def create(self, topsis: TopsisEntity) -> TopsisEntity:
        topsis_model = self.model(**topsis.model_dump())
        await self._create(topsis_model)
        return TopsisEntity(**topsis_model.model_dump())

    async def create_massive(
        self, topsis_list: List[TopsisEntity]
    ) -> List[TopsisEntity]:
        records_bulk = [item.model_dump() for item in topsis_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_all_by_id(self, report_id: str) -> List[TopsisEntity]:
        records_model = await self._get_all_by(key="report_id", value=report_id)
        return [TopsisEntity(**item.model_dump()) for item in records_model]
