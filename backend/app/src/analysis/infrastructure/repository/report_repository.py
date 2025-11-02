from collections import defaultdict
from typing import Any, Dict, List, Optional

from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.repositories.report_repository import ReportRepository
from app.src.analysis.infrastructure.models.report_model import ReportModelSQL
from app.src.analysis.infrastructure.repository.exceptions import InvalidReportIDError
from sqlalchemy.ext.asyncio import AsyncSession


class ReportRepositorySQL(ReportRepository):
    """Report Repository implementation."""

    def __init__(self, session: AsyncSession):
        super().__init__(model=ReportModelSQL, session=session)

    async def create(self, report: ReportEntity) -> ReportEntity:
        report_model = self.model(**report.model_dump())
        await self._create(report_model)
        return ReportEntity(**report_model.model_dump())

    async def create_massive(
            self, report_list: List[ReportEntity]
    ) -> List[ReportEntity]:
        records_bulk = [item.model_dump() for item in report_list]
        saved_items = await self._bulk_insert(records=records_bulk, return_ids=True)
        return saved_items

    async def get_by_report_id(self, report_id: str) -> Optional[ReportEntity]:
        report_model = await self._get_by_id(report_id)

        if not report_model:
            raise InvalidReportIDError(report_id)

        return ReportEntity(**report_model.model_dump())

    async def get_all(self, page: int, page_size: int) -> List[ReportEntity]:
        pass

    async def get_resume(self, job_id: str) -> Optional[List[Any]]:
        # get all records for job_id
        report_list = await self._filter_by(key="job_id", value=job_id)

        grouped_report: Dict[str, List[ReportModelSQL]] = defaultdict(list)
        for item in report_list:
            grouped_report[item.family or "General"].append(item)

        response = []
        for category_name, reports in grouped_report.items():
            grouped_variant: Dict[str, List[ReportModelSQL]] = defaultdict(list)
            for r in reports:
                grouped_variant[r.variant or "General"].append(r)

            # group and generates categories for variants
            variant_children = []
            for variant_name, variant_reports in grouped_variant.items():
                variant_children.append(
                    {
                        "title": variant_name,
                        "size": len(variant_reports),
                        "children": [
                            {
                                "id": r.id,
                                "type": r.type,
                                "variant": r.variant,
                                "url": f"/{r.type}/{r.id}",
                            }
                            for r in variant_reports
                        ],
                    }
                )

            item = {
                "title": (
                    category_name if category_name != "General" else "Reporte General"
                ),
                "size": len(reports),
                "children": variant_children,
            }

            response.append(item)

        response.sort(key=lambda x: 0 if x["title"] == "Reporte General" else 1)
        return response
