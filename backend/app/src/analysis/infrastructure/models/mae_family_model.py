from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column


class MAEFamilyModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "MAEFamily"

    family: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    data: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    report_id: Mapped[str] = mapped_column(
        ForeignKey("Report.id", ondelete="CASCADE"), nullable=False
    )
