from abc import abstractmethod
from typing import List

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.mae_variant_entity import MAEVariantEntity


class MAEVariantRepository(ElementalRepository):
    """MAEVariant Repository definition."""

    @abstractmethod
    async def create(self, mae: MAEVariantEntity) -> MAEVariantEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, mae_list: List[MAEVariantEntity]
    ) -> List[MAEVariantEntity]:
        pass

    @abstractmethod
    async def get_all_by_id(self, report_id: str) -> List[MAEVariantEntity]:
        pass
