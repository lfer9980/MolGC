import json
from typing import Dict, List

from app.src.analysis.application.report.get_all_by_job.dto import (
    GetAllByJobDTO,
    ResponseReportDTO,
)
from app.src.analysis.domain.entities.mae_variant_entity import MAEVariantEntity
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.enums import ReportTypeEnum
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.jobs.domain.entities.job_entity import JobEntity
from sqlalchemy.ext.asyncio import AsyncSession


class GetAllByJobReportService:
    def __init__(self, session: AsyncSession, repository: ReportRepository):
        self.session = session
        self.repository = repository

    async def execute(self, job_entity: JobEntity) -> GetAllByJobDTO:
        reports: List[ReportEntity] = await self.repository.get_all_by_job_id(
            job_entity.id
        )

        grouped: Dict[str, Dict[str, List[Dict]]] = {}
        for report in reports:
            handler = {
                ReportTypeEnum.MAE_VARIANT: self._get_mae_variant,
                ReportTypeEnum.MAE_FAMILY: self._get_mae_family,
                ReportTypeEnum.MAE_GENERAL: self._get_mae_general,
                ReportTypeEnum.RMSD: self._get_rmsd,
                ReportTypeEnum.STRUCTURE: self._get_structure,
                ReportTypeEnum.TOPSIS: self._get_topsis,
            }.get(report.type)

            if not handler:
                family_name = "Reporte General"
                variant_name = "General"

                grouped.setdefault(family_name, {}).setdefault(variant_name, []).append(
                    {
                        "id": report.id,
                        "report_id": report.id,
                        "type": str(report.type),
                        "note": "no handler for this report type",
                    }
                )
                continue

            child = await handler(report)
            child = child.model_dump()

            family_name = child.get("family") or "Reporte General"
            variant_name = child.get("variant") or "General"

            grouped.setdefault(family_name, {}).setdefault(variant_name, []).append(
                child
            )

        # reordering to have Reporte General and General at first position
        ordered_families = {}
        if "Reporte General" in grouped:
            ordered_families["Reporte General"] = grouped.pop("Reporte General")

        for fam, variants in grouped.items():
            ordered_families[fam] = variants

        grouped = ordered_families
        for fam, variants in grouped.items():
            ordered_variants = {}

            if "General" in variants:
                ordered_variants["General"] = variants.pop("General")

            for var, reps in variants.items():
                ordered_variants[var] = reps

            grouped[fam] = ordered_variants

        children = []
        for family, variants_dict in grouped.items():
            items = []
            for variant, reports_list in variants_dict.items():
                items.append({"variant": variant, "children": reports_list})

            children.append({"family": family, "children": items})

        result_dto = GetAllByJobDTO(
            job_id=job_entity.id,
            reference=job_entity.reference,
            analysis_type=job_entity.analysis_type,
            size=len(children),
            children=children,
        )
        return result_dto

    async def _get_mae_variant(self, report_entity: ReportEntity):
        from app.src.analysis.application.mae_variant.get_by_report.service import (
            GetByIDMAEVariantService,
        )
        from app.src.analysis.infrastructure.repository.mae_variant_repository import (
            MAEVariantRepositorySQL,
        )

        repository = MAEVariantRepositorySQL(self.session)
        service = GetByIDMAEVariantService(repository)

        dataset = await service.execute(report_entity.id)
        report_data = self._prepare_mae_variant_chart(dataset, report_entity)

        return ResponseReportDTO(
            family=dataset[0].family,
            variant=dataset[0].variant,
            type=report_entity.type,
            title=report_entity.title,
            data=report_data,
        )

    async def _get_mae_family(self, report_entity: ReportEntity):
        from app.src.analysis.application.mae_family.get_by_report.service import (
            GetByIDMAEFamilyService,
        )
        from app.src.analysis.infrastructure.repository.mae_family_repository import (
            MAEFamilyRepositorySQL,
        )

        repository = MAEFamilyRepositorySQL(self.session)
        service = GetByIDMAEFamilyService(repository)

        dataset = await service.execute(report_entity.id)

        report_data = {
            **dataset.model_dump(),
            "type": report_entity.type,
            "title": report_entity.title,
            "data": json.loads(dataset.data),
        }

        return ResponseReportDTO(**report_data)

    async def _get_mae_general(self, report_entity: ReportEntity):
        from app.src.analysis.application.mae_general.get_by_report.service import (
            GetByIDMAEGeneralService,
        )
        from app.src.analysis.infrastructure.repository.mae_general_repository import (
            MAEGeneralRepositorySQL,
        )

        repository = MAEGeneralRepositorySQL(self.session)
        service = GetByIDMAEGeneralService(repository)

        dataset = await service.execute(report_entity.id)

        report_data = {
            **dataset.model_dump(),
            "type": report_entity.type,
            "title": report_entity.title,
            "data": json.loads(dataset.data),
        }

        return ResponseReportDTO(**report_data)

    async def _get_rmsd(self, report_entity: ReportEntity):
        from app.src.analysis.application.rmsd.get_by_report.service import (
            GetByIDRMSDService,
        )
        from app.src.analysis.infrastructure.repository.rmsd_repository import (
            RMSDRepositorySQL,
        )

        repository = RMSDRepositorySQL(self.session)
        service = GetByIDRMSDService(repository)

        dataset = await service.execute(report_entity.id)
        report_data = self._prepare_mae_variant_chart(dataset, report_entity)

        return ResponseReportDTO(
            family=dataset[0].family,
            variant=dataset[0].variant,
            type=report_entity.type,
            title=report_entity.title,
            data=report_data,
        )

    async def _get_structure(self, report_entity: ReportEntity):
        from app.src.analysis.application.structure.get_by_report.service import (
            GetByIDStructureService,
        )
        from app.src.analysis.infrastructure.repository.structure_repository import (
            StructureRepositorySQL,
        )

        repository = StructureRepositorySQL(self.session)
        service = GetByIDStructureService(repository)

        dataset = await service.execute(report_entity.id)

        report_data = {
            **dataset.model_dump(),
            "type": report_entity.type,
            "title": report_entity.title,
            "data": json.loads(dataset.data),
        }

        return ResponseReportDTO(**report_data)

    async def _get_topsis(self, report_entity: ReportEntity):
        from app.src.analysis.application.topsis.get_by_report.service import (
            GetByIDTopsisService,
        )
        from app.src.analysis.infrastructure.repository.topsis_repository import (
            TopsisRepositorySQL,
        )

        repository = TopsisRepositorySQL(self.session)
        service = GetByIDTopsisService(repository)

        dataset = await service.execute(report_entity.id)

        report_data = [item.model_dump(exclude={"id", "report_id"}) for item in dataset]

        return ResponseReportDTO(
            type=report_entity.type, title=report_entity.title, data=report_data
        )

    @classmethod
    def _prepare_mae_variant_chart(
        cls, data: List[MAEVariantEntity], report_entity: ReportEntity
    ) -> dict:
        """Prepare the Chart.js-compatible data structure for MAE General.

        :param data: list with calculated MAE values
        :return: dictionary with Chart.js structure
        """
        labels = []
        values = []
        for item in data:
            label = f"{item.software}/{item.functional}"

            labels.append(label)
            values.append(item.value)

        return {
            "labels": labels,
            "datasets": [
                {
                    "type": "line",
                    "label": report_entity.variant,
                    "data": values,
                }
            ],
        }
