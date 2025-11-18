from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column


class MAEVariantModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "MAEVariant"

    family: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    variant: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    functional: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    software: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    reference: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    value: Mapped[float] = mapped_column(
        Float(),
        nullable=False,
    )

    report_id: Mapped[str] = mapped_column(
        ForeignKey("Report.id", ondelete="CASCADE"), nullable=False
    )
