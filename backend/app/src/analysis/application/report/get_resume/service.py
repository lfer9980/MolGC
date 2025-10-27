from typing import List

from app.src.analysis.application.report.get_resume.dto import GetResumeReportDTO
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.jobs.domain.entities.job_entity import JobEntity


class GetResumeReportService:
    def __init__(self, repository: ReportRepository):
        self.repository = repository

    async def execute(self, job_entity: JobEntity) -> List[GetResumeReportDTO]:
        """Get report resume."""
        report_list = await self.repository.get_resume(job_entity.id)

        return [
            GetResumeReportDTO(
                **item,
                reference=job_entity.reference,
                analysis_type=job_entity.analysis_type,
                job_id=job_entity.id,
            )
            for item in report_list
        ]
