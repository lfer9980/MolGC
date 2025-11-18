from pydantic import BaseModel

from .individual import SoftEnum


class FunctionalModel(BaseModel):
    """Selected Functional Model."""

    software: SoftEnum
    functional: str
