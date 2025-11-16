from abc import abstractmethod
from typing import Any, List, Optional

from app.infrastructure.database.sql.models.repository import ElementalRepository
from app.src.analysis.domain.entities.report_entity import ReportEntity
from app.src.analysis.domain.value_objects.report import ReportID


class ReportRepository(ElementalRepository):
    """Report Repository definition."""

    @abstractmethod
    async def create(self, report: ReportEntity) -> ReportEntity:
        pass

    @abstractmethod
    async def create_massive(
        self, report_list: List[ReportEntity]
    ) -> List[ReportEntity]:
        pass

    @abstractmethod
    async def get_by_report_id(self, report_id: ReportID) -> Optional[ReportEntity]:
        pass

    @abstractmethod
    async def get_resume(self, job_id: str) -> Optional[List[Any]]:
        pass

    @abstractmethod
    async def get_all_by_job_id(self, job_id: str) -> List[ReportEntity]:
        pass