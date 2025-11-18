from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column


class MAEGeneralModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "MAEGeneral"

    data: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    report_id: Mapped[str] = mapped_column(
        ForeignKey("Report.id", ondelete="CASCADE"), nullable=False
    )
