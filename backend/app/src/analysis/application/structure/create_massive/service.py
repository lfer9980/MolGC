from collections import defaultdict
from typing import List

from app.src.analysis.application.structure.create_massive.dto import CreateStructureDTO
from app.src.analysis.application.structure.create_massive.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.entities.structure_entity import StructureEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.analysis.domain.repositories.structure_repository import (
    StructureRepository,
)


class MassiveStructureService:
    def __init__(
        self, repository: StructureRepository, repository_report: ReportRepository
    ):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data_list: List[CreateStructureDTO]
    ) -> List[StructureEntity]:
        """Create a new Structure registration."""
        if not new_data_list:
            return []

        # Group by variant
        grouped_by_variant = defaultdict(list)
        for item in new_data_list:
            grouped_by_variant[item.variant].append(item)

        # iterates over every group and creates its own report entity
        all_entities: List[StructureEntity] = []
        for variant_name, items in grouped_by_variant.items():
            # create report registry
            report_metadata = {
                "job_id": job_id,
                "type": ReportTypeEnum.STRUCTURE,
                "scope": ReportScopeEnum.VARIANT,
                "family": items[0].family,
                "variant": items[0].variant,
                "title": f"Stacked molecules for: {variant_name}",
            }

            report_entity = await self.repository_report.create(
                ReportEntity(**report_metadata)
            )

            if report_entity.id is None:
                raise ReportNotCreatedError(
                    f"Failed to create STRUCTURE report for variant {variant_name}"
                )

            # Parse report data
            structure_entities = [
                StructureEntity(
                    report_id=report_entity.id,
                    **item.model_dump(),
                )
                for item in items
            ]

            all_entities.extend(structure_entities)

        return await self.repository.create_massive(all_entities)
