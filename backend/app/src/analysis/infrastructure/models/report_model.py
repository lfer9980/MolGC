from typing import Optional

from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from app.src.analysis.domain.enums import ReportScopeEnum, ReportTypeEnum
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column


class ReportModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "Report"

    type: Mapped[ReportTypeEnum] = mapped_column(
        String(),
        nullable=False,
    )

    scope: Mapped[ReportScopeEnum] = mapped_column(
        String(),
        nullable=False,
    )

    family: Mapped[Optional[str]] = mapped_column(
        String(),
    )

    variant: Mapped[Optional[str]] = mapped_column(
        String(),
    )

    title: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    job_id: Mapped[str] = mapped_column(
        ForeignKey("Job.id", ondelete="CASCADE"), nullable=False
    )
