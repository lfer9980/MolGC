from pydantic import BaseModel


class MaeVariantModel(BaseModel):
    """General MAE Variant Model."""

    functional: str
    software: str
    value: float
