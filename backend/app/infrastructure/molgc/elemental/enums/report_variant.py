from typing import Optional

from pydantic import BaseModel, Field

from .mae_variant import MaeVariantModel
from .rmsd_variant import RMSDVariantModel


class ReportVariantModel(BaseModel):
    """General Report Model."""

    family: str
    variant: str
    reference: str
    mae: list[MaeVariantModel] = Field(default_factory=list)
    rmsd: list[RMSDVariantModel] = Field(default_factory=list)
    structure: Optional[str] = ""
