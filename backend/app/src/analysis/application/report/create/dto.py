from app.elemental.common import ElementalSchema
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum


class CreateReportDTO(ElementalSchema):
    job_id: str
    type: ReportTypeEnum
    scope: ReportScopeEnum
    title: str
