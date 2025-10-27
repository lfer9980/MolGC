from pydantic import BaseModel


class ReportModel(BaseModel):
    """General Report Family Model."""

    family: str
    data: str
