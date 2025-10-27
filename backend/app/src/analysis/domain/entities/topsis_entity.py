from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.topsis import (
    TopsisCloseness,
    TopsisCriteria,
    TopsisDIdeal,
    TopsisDNotIdeal,
    TopsisFunctional,
    TopsisID,
    TopsisRanking,
    TopsisReport,
)
from pydantic import Field


class TopsisEntity(ElementalSchema):
    id: TopsisID = Field(
        default_factory=lambda: str(uuid4().hex), description="Topsis ID"
    )

    report_id: TopsisReport = Field(description="Topsis relationship with Report Model")

    functional: TopsisFunctional = Field(description="Topsis Functional")

    criteria: TopsisCriteria = Field(description="Topsis criteria")

    d_ideal: TopsisDIdeal = Field(description="Topsis DIdeal")

    d_not_ideal: TopsisDNotIdeal = Field(description="Topsis DNotIdeal")

    closeness: TopsisCloseness = Field(description="Topsis Closeness")

    ranking: TopsisRanking = Field(description="Topsis Ranking")
