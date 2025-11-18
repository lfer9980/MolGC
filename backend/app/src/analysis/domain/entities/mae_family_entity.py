from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.mae_family import (
    MAEFamilyData,
    MAEFamilyFamily,
    MAEFamilyID,
    MAEFamilyReport,
)
from pydantic import Field


class MAEFamilyEntity(ElementalSchema):
    id: MAEFamilyID = Field(
        default_factory=lambda: str(uuid4().hex), description="MAE Family ID"
    )

    report_id: MAEFamilyReport = Field(
        description="MAE Family relationship with Report Model"
    )

    family: MAEFamilyFamily = Field(description="MAE Family Family name")

    data: MAEFamilyData = Field(description="MAE Family Data")
