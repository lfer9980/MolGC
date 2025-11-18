from typing import List

from app.src.analysis.domain.entities.rmsd_entity import RMSDEntity
from app.src.analysis.domain.repositories.rmsd_repository import RMSDRepository
from app.src.analysis.infrastructure.models.rmsd_model import RMSDModelSQL
from sqlalchemy.ext.asyncio import AsyncSession


class RMSDRepositorySQL(RMSDRepository):
    """RMSD Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=RMSDModelSQL, session=session)

    async def create(self, rmsd: RMSDEntity) -> RMSDEntity:
        rmsd_model = self.model(**rmsd.model_dump())
        await self._create(rmsd_model)
        return RMSDEntity(**rmsd_model.model_dump())

    async def create_massive(self, rmsd_list: List[RMSDEntity]) -> List[RMSDEntity]:
        records_bulk = [item.model_dump() for item in rmsd_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_all_by_id(self, report_id: str) -> List[RMSDEntity]:
        records_model = await self._get_all_by(key="report_id", value=report_id)
        return [RMSDEntity(**item.model_dump()) for item in records_model]
