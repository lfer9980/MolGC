from app.src.analysis.domain.repositories.rmsd_repository import RMSDRepository


class GetByIDRMSDService:
    def __init__(self, repository: RMSDRepository):
        self.repository = repository

    async def execute(self, report_id: str):
        """Get report by ID."""
        return await self.repository.get_all_by_id(report_id)
