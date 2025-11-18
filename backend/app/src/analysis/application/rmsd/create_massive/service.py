from collections import defaultdict
from typing import List

from app.src.analysis.application.mae_variant.create_massive.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.application.rmsd.create_massive.dto import CreateRMSDDTO
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.entities.rmsd_entity import RMSDEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.analysis.domain.repositories.rmsd_repository import RMSDRepository


class MassiveRMSDService:
    def __init__(self, repository: RMSDRepository, repository_report: ReportRepository):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data_list: List[CreateRMSDDTO]
    ) -> List[RMSDEntity]:
        """Create a new RMSD registration."""
        if not new_data_list:
            return []

        grouped_by_variant = defaultdict(list)
        for item in new_data_list:
            grouped_by_variant[item.variant].append(item)

        # iterates over every group and creates its own report entity
        all_entities: List[RMSDEntity] = []
        for variant_name, items in grouped_by_variant.items():
            # create report registry
            report_metadata = {
                "job_id": job_id,
                "type": ReportTypeEnum.RMSD,
                "scope": ReportScopeEnum.VARIANT,
                "family": items[0].family,
                "variant": items[0].variant,
                "title": f"RMSD of functional - {variant_name}",
            }

            report_data = ReportEntity(**report_metadata)
            report_entity = await self.repository_report.create(report_data)

            if report_entity.id is None:
                raise ReportNotCreatedError(
                    f"Failed to create RMSD report for variant {variant_name}"
                )

            # Parse report data
            rmsd_entities = [
                RMSDEntity(report_id=report_entity.id, **item.model_dump())
                for item in items
            ]

            all_entities.extend(rmsd_entities)

        return await self.repository.create_massive(all_entities)
