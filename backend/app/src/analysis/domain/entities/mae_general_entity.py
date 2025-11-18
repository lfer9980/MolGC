from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.mae_general import (
    MAEGeneralData,
    MAEGeneralID,
    MAEGeneralReport,
)
from pydantic import Field


class MAEGeneralEntity(ElementalSchema):
    id: MAEGeneralID = Field(
        default_factory=lambda: str(uuid4().hex), description="MAE General ID"
    )

    report_id: MAEGeneralReport = Field(
        description="MAE General relationship with Report Model"
    )

    data: MAEGeneralData = Field(description="MAE General data")
