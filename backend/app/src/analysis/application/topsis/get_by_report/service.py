from app.src.analysis.domain.repositories.topsis_repository import TopsisRepository


class GetByIDTopsisService:
    def __init__(self, repository: TopsisRepository):
        self.repository = repository

    async def execute(self, report_id: str):
        """Get report by ID."""
        return await self.repository.get_all_by_id(report_id)
