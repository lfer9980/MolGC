from typing import Optional

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobAnalysisEnum, JobStatusEnum


class UpdateJobDTO(ElementalSchema):
    status: Optional[JobStatusEnum] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    reference: Optional[str] = None
