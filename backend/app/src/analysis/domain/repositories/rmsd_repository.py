from abc import abstractmethod
from typing import List

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.rmsd_entity import RMSDEntity


class RMSDRepository(ElementalRepository):
    """RMSD Repository definition."""

    @abstractmethod
    async def create(self, rmsd: RMSDEntity) -> RMSDEntity:
        pass

    @abstractmethod
    async def create_massive(self, rmsd_list: List[RMSDEntity]) -> List[RMSDEntity]:
        pass

    @abstractmethod
    async def get_all_by_id(self, report_id: str) -> List[RMSDEntity]:
        pass
