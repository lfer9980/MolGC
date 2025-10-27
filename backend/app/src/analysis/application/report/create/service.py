from app.src.analysis.application.report.create.dto import CreateReportDTO
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.repositories.report_repository import ReportRepository


class CreateReportService:
    def __init__(self, repository: ReportRepository):
        self.repository = repository

    async def execute(self, new_data: CreateReportDTO) -> ReportEntity:
        """Create a new report."""
        report_data = ReportEntity(**new_data.model_dump())
        return await self.repository.create(report_data)
