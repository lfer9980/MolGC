import json
from typing import List

from app.src.analysis.application.report.get_by_id.dto import (
    GetByIDReportDTO,
    ResponseReportDTO,
)
from app.src.analysis.application.report.get_by_id.exceptions import ReportNotFound
from app.src.analysis.domain.entities.mae_variant_entity import MAEVariantEntity
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.enums import ReportTypeEnum
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from sqlalchemy.ext.asyncio import AsyncSession


class GetByIDReportService:
    def __init__(self, session: AsyncSession, repository: ReportRepository):
        self.repository = repository
        self.session = session

    async def execute(self, query: GetByIDReportDTO) -> ResponseReportDTO:
        """Get report by ID."""
        report_type = query.type
        report_id = query.report_id

        report_repository = ReportRepositorySQL(self.session)
        report_entity = await report_repository.get_by_report_id(report_id)

        if not report_entity:
            raise ReportNotFound()

        switch = {
            ReportTypeEnum.MAE_VARIANT: self._get_mae_variant,
            ReportTypeEnum.MAE_FAMILY: self._get_mae_family,
            ReportTypeEnum.MAE_GENERAL: self._get_mae_general,
            ReportTypeEnum.RMSD: self._get_rmsd,
            ReportTypeEnum.STRUCTURE: self._get_structure,
            ReportTypeEnum.TOPSIS: self._get_topsis,
        }

        handler = switch.get(report_type)

        return await handler(report_entity)

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
            id=dataset[0].id,
            report_id=dataset[0].report_id,
            family=dataset[0].family,
            variant=dataset[0].variant,
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
            id=dataset[0].id,
            report_id=dataset[0].report_id,
            family=dataset[0].family,
            variant=dataset[0].variant,
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
            id=dataset[0].id, report_id=dataset[0].report_id, data=report_data
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
                    "type": "bar",
                    "label": report_entity.variant,
                    "data": values,
                }
            ],
            "title": report_entity.title,
        }
