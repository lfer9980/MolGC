from typing import Optional
from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.report import (
    ReportFamily,
    ReportID,
    ReportJob,
    ReportScope,
    ReportTitle,
    ReportType,
    ReportVariant,
)
from pydantic import Field


class ReportEntity(ElementalSchema):
    id: ReportID = Field(
        default_factory=lambda: str(uuid4().hex), description="Report ID"
    )

    job_id: ReportJob = Field(description="Report relationship with Job Model")

    type: ReportType = Field(
        description="Report Type: MAE_GENERAL, MAE_FAMILY, MAE_VARIANT, RMSD_VARIANT, STRUCTURE_VARIANT, TOPSIS"
    )

    scope: ReportScope = Field(
        description="Report Scope: general, family_name, variant_name"
    )

    family: Optional[ReportFamily] = Field(
        description="Report Family",
        default=None,
    )

    variant: Optional[ReportVariant] = Field(
        description="Report Family",
        default=None,
    )

    title: ReportTitle = Field(description="Report Title")
