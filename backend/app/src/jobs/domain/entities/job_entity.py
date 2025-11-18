from typing import Optional
from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.value_objects.job import (
    JobAnalysis,
    JobExpires,
    JobID,
    JobReference,
    JobStatus,
    JobUpdated,
    JobUpload,
)
from pydantic import Field


class JobEntity(ElementalSchema):
    id: JobID = Field(default_factory=lambda: str(uuid4().hex), description="Job ID")

    analysis_type: Optional[JobAnalysis] = Field(description="Job Analysis Type")

    upload_type: JobUpload = Field(description="Job Analysis Type")

    status: JobStatus = Field(description="Job Status")

    reference: Optional[JobReference] = Field(description="Job Reference")

    expires_at: JobExpires = Field(description="Job Expiration date")

    updated_at: Optional[JobUpdated] = Field(description="Job Updated date")
