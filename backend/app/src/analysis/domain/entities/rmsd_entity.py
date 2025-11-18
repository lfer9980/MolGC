from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.rmsd import (
    RMSDID,
    RMSDFamily,
    RMSDFunctional,
    RMSDReference,
    RMSDReport,
    RMSDSoftware,
    RMSDValue,
    RMSDVariant,
)
from pydantic import Field


class RMSDEntity(ElementalSchema):
    id: RMSDID = Field(default_factory=lambda: str(uuid4().hex), description="RMSD ID")

    report_id: RMSDReport = Field(description="RMSD relationship with Report Model")

    family: RMSDFamily = Field(description="RMSD family")

    variant: RMSDVariant = Field(description="RMSD variant")

    functional: RMSDFunctional = Field(description="RMSD functional")

    software: RMSDSoftware = Field(description="RMSD software")

    reference: RMSDReference = Field(description="RMSD reference")

    value: RMSDValue = Field(description="RMSD value")
