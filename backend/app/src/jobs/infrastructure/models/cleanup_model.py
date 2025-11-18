from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column


class CleanupModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "Cleanup"

    scheduled_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )

    job_id: Mapped[str] = mapped_column(
        ForeignKey("Job.id", ondelete="CASCADE"), nullable=False
    )
