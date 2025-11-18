from pydantic import BaseModel


class RMSDVariantModel(BaseModel):
    """General RMSD Model."""

    functional: str
    software: str
    value: float
