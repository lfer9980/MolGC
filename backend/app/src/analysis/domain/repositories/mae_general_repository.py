from abc import abstractmethod
from typing import List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.mae_general_entity import MAEGeneralEntity


class MAEGeneralRepository(ElementalRepository):
    """MAEGeneral Repository definition."""

    @abstractmethod
    async def create(self, mae: MAEGeneralEntity) -> MAEGeneralEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, mae_list: List[MAEGeneralEntity]
    ) -> List[MAEGeneralEntity]:
        pass

    @abstractmethod
    async def get_by_report_id(self, report_id: str) -> Optional[MAEGeneralEntity]:
        pass
