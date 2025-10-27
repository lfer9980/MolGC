from collections import defaultdict
from typing import List

from app.src.analysis.application.mae_variant.create_massive.dto import (
    CreateMAEVariantDTO,
)
from app.src.analysis.application.mae_variant.create_massive.exceptions import (
    ReportNotCreatedError,
)
from app.src.analysis.domain.entities.mae_variant_entity import MAEVariantEntity
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from app.src.analysis.domain.repositories.mae_variant_repository import (
    MAEVariantRepository,
)
from app.src.analysis.domain.repositories.report_repository import ReportRepository


class MassiveMAEVariantService:
    def __init__(
        self, repository: MAEVariantRepository, repository_report: ReportRepository
    ):
        self.repository = repository
        self.repository_report = repository_report

    async def execute(
        self, job_id: str, new_data_list: List[CreateMAEVariantDTO]
    ) -> List[MAEVariantEntity]:
        """Create a new MAEVariant registration."""
        if not new_data_list:
            return []

        # Group by variant
        grouped_by_variant = defaultdict(list)
        for item in new_data_list:
            grouped_by_variant[item.variant].append(item)

        # iterates over every group and creates its own report entity
        all_entities: List[MAEVariantEntity] = []
        for variant_name, items in grouped_by_variant.items():
            # create report registry
            report_metadata = {
                "job_id": job_id,
                "type": ReportTypeEnum.MAE_VARIANT,
                "scope": ReportScopeEnum.VARIANT,
                "family": items[0].family,
                "variant": items[0].variant,
                "title": f"{variant_name} Bond lengths MAE Functional",
            }

            report_entity = await self.repository_report.create(
                ReportEntity(**report_metadata)
            )

            if report_entity.id is None:
                raise ReportNotCreatedError(
                    f"Failed to create MAE report for variant {variant_name}"
                )

            # Parse report data
            mae_entities = [
                MAEVariantEntity(
                    report_id=report_entity.id,
                    **item.model_dump(),
                )
                for item in items
            ]

            all_entities.extend(mae_entities)

        return await self.repository.create_massive(all_entities)
