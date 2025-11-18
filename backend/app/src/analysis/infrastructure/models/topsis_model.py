from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import JSON, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class TopsisModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "Topsis"

    functional: Mapped[str] = mapped_column(
        String(),
        nullable=False,
    )

    criteria: Mapped[dict] = mapped_column(
        JSON(),
        nullable=False,
    )

    d_ideal: Mapped[float] = mapped_column(
        Float(),
        nullable=False,
    )

    d_not_ideal: Mapped[float] = mapped_column(
        Float(),
        nullable=False,
    )

    closeness: Mapped[float] = mapped_column(
        Float(),
        nullable=False,
    )

    ranking: Mapped[float] = mapped_column(
        Integer(),
        nullable=False,
    )

    report_id: Mapped[str] = mapped_column(
        ForeignKey("Report.id", ondelete="CASCADE"), nullable=False
    )
