from datetime import datetime
from typing import Optional

from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from app.src.jobs.domain.enums import JobAnalysisEnum, JobStatusEnum, JobUploadTypeEnum
from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column


class JobModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "Job"

    analysis_type: Mapped[Optional[JobAnalysisEnum]] = mapped_column(
        String(),
    )

    upload_type: Mapped[JobUploadTypeEnum] = mapped_column(String(), nullable=False)

    status: Mapped[JobStatusEnum] = mapped_column(String(), nullable=False)

    reference: Mapped[Optional[str]] = mapped_column(
        String(),
    )

    expires_at: Mapped[datetime] = mapped_column(DateTime(), nullable=False)
