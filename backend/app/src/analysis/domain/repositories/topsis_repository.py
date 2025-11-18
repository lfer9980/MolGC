from abc import abstractmethod
from typing import List

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.topsis_entity import TopsisEntity


class TopsisRepository(ElementalRepository):
    """Topsis Repository definition."""

    @abstractmethod
    async def create(self, topsis: TopsisEntity) -> TopsisEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, topsis_list: List[TopsisEntity]
    ) -> List[TopsisEntity]:
        pass

    @abstractmethod
    async def get_all_by_id(self, report_id: str) -> List[TopsisEntity]:
        pass
