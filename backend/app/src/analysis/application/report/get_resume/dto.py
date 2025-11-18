from typing import Dict, List, Optional

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobAnalysisEnum


class GetResumeReportDTO(ElementalSchema):
    title: str
    job_id: str
    reference: Optional[str] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    size: int
    children: List[Dict]
