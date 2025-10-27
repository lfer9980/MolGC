from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobUploadTypeEnum


class CreateRequest(ElementalSchema):
    upload_type: JobUploadTypeEnum

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "upload_type": JobUploadTypeEnum.MANUAL,
                }
            ]
        }
    }
