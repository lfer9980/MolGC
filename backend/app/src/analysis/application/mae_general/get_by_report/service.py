from app.src.analysis.domain.repositories.mae_general_repository import (
    MAEGeneralRepository,
)


class GetByIDMAEGeneralService:
    def __init__(self, repository: MAEGeneralRepository):
        self.repository = repository

    async def execute(self, report_id: str):
        """Get report by ID."""
        return await self.repository.get_by_report_id(report_id)
