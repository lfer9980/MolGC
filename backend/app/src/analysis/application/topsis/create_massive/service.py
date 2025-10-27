from typing import List

from app.src.analysis.application.topsis.create_massive.dto import CreateTopsisDTO
from app.src.analysis.application.topsis.create_massive.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.entities.topsis_entity import TopsisEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.analysis.domain.repositories.topsis_repository import TopsisRepository


class MassiveTopsisService:
    def __init__(
        self, repository: TopsisRepository, repository_report: ReportRepository
    ):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data_list: List[CreateTopsisDTO]
    ) -> List[TopsisEntity]:
        """Create a new Topsis registration."""

        # create report registry
        report_metadata = {
            "job_id": job_id,
            "type": ReportTypeEnum.TOPSIS,
            "scope": ReportScopeEnum.GENERAL,
            "title": "TOPSIS Report",
        }

        report_data = ReportEntity(**report_metadata)
        report_entity = await self.repository_report.create(report_data)

        # TODO: check if this validation is necessary
        if report_entity.id is None:
            raise ReportNotCreatedError()

        mae_entities = [
            TopsisEntity(report_id=report_entity.id, **item.model_dump())
            for item in new_data_list
        ]
        return await self.repository.create_massive(mae_entities)
