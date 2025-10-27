from app.src.analysis.domain.repositories.mae_variant_repository import (
    MAEVariantRepository,
)


class GetByIDMAEVariantService:
    def __init__(self, repository: MAEVariantRepository):
        self.repository = repository

    async def execute(self, report_id: str):
        """Get report by ID."""
        return await self.repository.get_all_by_id(report_id)
