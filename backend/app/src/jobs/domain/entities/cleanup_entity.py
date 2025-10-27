from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.value_objects.cleanup import (
    CleanupID,
    CleanupJob,
    CleanupScheduled,
)
from pydantic import Field


class CleanupEntity(ElementalSchema):
    id: CleanupID = Field(
        default_factory=lambda: str(uuid4().hex), description="Cleanup ID"
    )

    job_id: CleanupJob = Field(description="Cleanup relationship with Job Model")

    scheduled_at: CleanupScheduled = Field(description="Cleanup scheduled time")
