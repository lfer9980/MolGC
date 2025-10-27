from typing import Optional, Union

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.enums import ReportTypeEnum


class GetByIDReportDTO(ElementalSchema):
    job_id: str
    report_id: str
    type: ReportTypeEnum


class ResponseReportDTO(ElementalSchema):
    id: str
    report_id: str
    family: Optional[str] = None
    variant: Optional[str] = None
    data: Union[dict, list]
