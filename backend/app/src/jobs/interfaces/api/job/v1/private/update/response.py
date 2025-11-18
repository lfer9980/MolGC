from datetime import datetime
from typing import Optional

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobAnalysisEnum, JobStatusEnum, JobUploadTypeEnum


class UpdateResponse(ElementalSchema):
    analysis_type: Optional[JobAnalysisEnum]
    upload_type: JobUploadTypeEnum
    status: Optional[JobStatusEnum]
    reference: Optional[str]
    expires_at: datetime
    updated_at: datetime

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "analysis_type": JobAnalysisEnum.INDIVIDUAL,
                    "upload_type": JobUploadTypeEnum.MANUAL,
                    "status": JobStatusEnum.UPLOAD_PENDING,
                    "reference": "<REFERENCE>",
                    "expires_at": "2023-01-01T00:00:00Z",
                    "updated_at": "2023-01-01T00:00:00Z",
                }
            ]
        }
    }
