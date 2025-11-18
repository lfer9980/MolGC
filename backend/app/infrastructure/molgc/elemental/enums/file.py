from typing import Optional

import pandas as pd
from pydantic import BaseModel, ConfigDict, field_validator

from .individual import ExtEnum, SoftEnum


class FileModel(BaseModel):
    """General File Model."""

    model_config = ConfigDict(arbitrary_types_allowed=True)

    path: str
    ext: ExtEnum
    family: str
    variant: str
    software: SoftEnum
    functional: str
    geom: Optional[pd.DataFrame] = None
    energy: Optional[dict] = None
    reference: Optional[str] = None

    @field_validator("geom", "energy")
    def check_is_dataframe(cls, v):
        if v is not None and not isinstance(v, pd.DataFrame):
            raise TypeError("'geom' or 'energy' field must be a DataFrame o None")
        return v
