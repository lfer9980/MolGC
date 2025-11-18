from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobUploadTypeEnum


class CreateJobDTO(ElementalSchema):
    upload_type: JobUploadTypeEnum
