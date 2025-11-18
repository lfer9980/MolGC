from app.src.analysis.application.mae_general.create.dto import CreateMAEGeneralDTO
from app.src.analysis.application.mae_general.create.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.domain.entities.mae_general_entity import MAEGeneralEntity
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.mae_general_repository import (
    MAEGeneralRepository,
)
from app.src.analysis.domain.repositories.report_repository import ReportRepository


class CreateMAEGeneralService:
    def __init__(
        self, repository: MAEGeneralRepository, repository_report: ReportRepository
    ):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data: CreateMAEGeneralDTO
    ) -> MAEGeneralEntity:
        """Create a new report."""
        # create report registry
        report_metadata = {
            "job_id": job_id,
            "type": ReportTypeEnum.MAE_GENERAL,
            "scope": ReportScopeEnum.GENERAL,
            "title": "MAE General Report",
        }

        report_data = ReportEntity(**report_metadata)
        report_entity = await self.repository_report.create(report_data)

        if report_entity.id is None:
            raise ReportNotCreatedError()

        mae_data = MAEGeneralEntity(report_id=report_entity.id, **new_data.model_dump())
        return await self.repository.create(mae_data)
