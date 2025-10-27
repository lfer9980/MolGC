from app.infrastructure.database.sql.models.tables import (
    ElementalTimestampTable,
    ElementalUUIDTable,
)
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column


class FileModelSQL(ElementalUUIDTable, ElementalTimestampTable):
    __tablename__ = "File"

    path: Mapped[str] = mapped_column(String(), nullable=False)

    family: Mapped[str] = mapped_column(String(), nullable=False)

    variant: Mapped[str] = mapped_column(String(), nullable=False)

    software: Mapped[str] = mapped_column(String(), nullable=False)

    functional: Mapped[str] = mapped_column(String(), nullable=False)

    filename: Mapped[str] = mapped_column(String(), nullable=False)

    checksum: Mapped[str] = mapped_column(String(), nullable=False)

    size: Mapped[int] = mapped_column(Integer(), nullable=False)

    job_id: Mapped[str] = mapped_column(
        ForeignKey("Job.id", ondelete="CASCADE"), nullable=False
    )
