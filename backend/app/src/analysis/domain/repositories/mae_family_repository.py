from abc import abstractmethod
from typing import List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.mae_family_entity import MAEFamilyEntity


class MAEFamilyRepository(ElementalRepository):
    """MAEFamily Repository definition."""

    @abstractmethod
    async def create(self, mae: MAEFamilyEntity) -> MAEFamilyEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, mae_list: List[MAEFamilyEntity]
    ) -> List[MAEFamilyEntity]:
        pass

    @abstractmethod
    async def get_by_report_id(self, report_id: str) -> Optional[MAEFamilyEntity]:
        pass
