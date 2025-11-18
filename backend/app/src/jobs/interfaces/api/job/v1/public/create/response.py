from datetime import datetime

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobStatusEnum, JobUploadTypeEnum


class CreateResponse(ElementalSchema):
    access_token: str
    upload_type: JobUploadTypeEnum
    status: JobStatusEnum
    expires_at: datetime

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "access_token": "<ACCESS_TOKEN>",
                    "upload_type": JobUploadTypeEnum.MANUAL,
                    "status": JobStatusEnum.UPLOAD_PENDING,
                    "expires_at": "2023-01-01T00:00:00Z",
                }
            ]
        }
    }
