from abc import abstractmethod
from typing import List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.structure_entity import StructureEntity


class StructureRepository(ElementalRepository):
    """Structure Repository definition."""

    @abstractmethod
    async def create(self, structure: StructureEntity) -> StructureEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, structure_list: List[StructureEntity]
    ) -> List[StructureEntity]:
        pass

    @abstractmethod
    async def get_by_report_id(self, report_id: str) -> Optional[StructureEntity]:
        pass
