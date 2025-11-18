from typing import Optional

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobAnalysisEnum, JobStatusEnum


class UpdateRequest(ElementalSchema):
    status: Optional[JobStatusEnum] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    reference: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "status": JobStatusEnum.UPLOAD_PENDING,
                    "analysis_type": JobAnalysisEnum.INDIVIDUAL,
                    "reference": "Gaussian - mO6",
                }
            ]
        }
    }
