from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.structure import (
    StructureData,
    StructureFamily,
    StructureID,
    StructureReference,
    StructureReport,
    StructureVariant,
)
from pydantic import Field


class StructureEntity(ElementalSchema):
    id: StructureID = Field(
        default_factory=lambda: str(uuid4().hex), description="Structure ID"
    )

    report_id: StructureReport = Field(
        description="Structure relationship with Report Model"
    )

    family: StructureFamily = Field(description="Structure family")

    variant: StructureVariant = Field(description="Structure variant")

    reference: StructureReference = Field(description="Structure reference")

    data: StructureData = Field(description="Structure Data")
