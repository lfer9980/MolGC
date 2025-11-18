from typing import Optional

from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column


class StructureModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "Structure"

    family: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    variant: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    reference: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    data: Mapped[Optional[str]] = mapped_column(
        String(),
    )

    report_id: Mapped[str] = mapped_column(
        ForeignKey("Report.id", ondelete="CASCADE"), nullable=False
    )
