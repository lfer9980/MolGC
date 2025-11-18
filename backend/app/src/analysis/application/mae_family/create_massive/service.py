from typing import List

from app.src.analysis.application.mae_family.create_massive.dto import (
    CreateMAEFamilyDTO,
)
from app.src.analysis.application.mae_family.create_massive.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.domain.entities.mae_family_entity import MAEFamilyEntity
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.mae_family_repository import (
    MAEFamilyRepository,
)
from app.src.analysis.domain.repositories.report_repository import ReportRepository


class MassiveMAEFamilyService:
    def __init__(
        self, repository: MAEFamilyRepository, repository_report: ReportRepository
    ):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data_list: List[CreateMAEFamilyDTO]
    ) -> List[MAEFamilyEntity]:
        """Create a new MAEFamily registration."""
        if not new_data_list:
            return []

        all_entities: List[MAEFamilyEntity] = []
        for item in new_data_list:
            # create report registry
            report_metadata = {
                "job_id": job_id,
                "type": ReportTypeEnum.MAE_FAMILY,
                "scope": ReportScopeEnum.FAMILY,
                "family": item.family,
                "title": f"Percentage MAE per functional and per molecule - {item.family}",
            }

            report_entity = await self.repository_report.create(
                ReportEntity(**report_metadata)
            )

            if report_entity.id is None:
                raise ReportNotCreatedError(
                    f"Failed to create MAE report for family {item.family}"
                )

            mae_entity = MAEFamilyEntity(
                report_id=report_entity.id, **item.model_dump()
            )

            all_entities.append(mae_entity)

        return await self.repository.create_massive(all_entities)
