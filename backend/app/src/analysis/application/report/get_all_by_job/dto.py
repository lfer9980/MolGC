from typing import Dict, List, Optional, Union

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.enums import ReportTypeEnum
from app.src.jobs.domain.enums import JobAnalysisEnum


class GetAllByJobDTO(ElementalSchema):
    job_id: str
    reference: Optional[str] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    size: int
    children: List[Dict]


class ResponseReportDTO(ElementalSchema):
    family: Optional[str] = None
    variant: Optional[str] = None
    type: ReportTypeEnum
    title: str
    data: Union[dict, list]
