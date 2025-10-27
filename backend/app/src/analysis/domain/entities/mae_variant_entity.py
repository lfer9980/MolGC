from uuid import uuid4

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.value_objects.mae_variant import (
    MAEVariantFamily,
    MAEVariantFunctional,
    MAEVariantID,
    MAEVariantReference,
    MAEVariantReport,
    MAEVariantSoftware,
    MAEVariantValue,
    MAEVariantVariant,
)
from pydantic import Field


class MAEVariantEntity(ElementalSchema):
    id: MAEVariantID = Field(
        default_factory=lambda: str(uuid4().hex), description="MAE Variant ID"
    )

    report_id: MAEVariantReport = Field(
        description="MAE Variant relationship with Report Model"
    )

    family: MAEVariantFamily = Field(description="MAE Variant family")

    variant: MAEVariantVariant = Field(description="MAE Variant variant")

    functional: MAEVariantFunctional = Field(description="MAE Variant functional")

    software: MAEVariantSoftware = Field(description="MAE Variant software")

    reference: MAEVariantReference = Field(description="MAE Variant reference")

    value: MAEVariantValue = Field(description="MAE Variant value")
