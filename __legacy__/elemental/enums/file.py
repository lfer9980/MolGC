import pandas as pd

from typing import Tuple, Optional
from pydantic import BaseModel, ConfigDict, field_validator

from elemental.enums import ExtEnum, FuncEnum


class FileModel(BaseModel):
    """

    """
    model_config = ConfigDict(arbitrary_types_allowed=True)

    path: str
    ext: ExtEnum
    family: str
    variant: str
    software: FuncEnum
    functional: str
    geom: Optional[pd.DataFrame] = None
    energy: Optional[dict] = None
    reference: Optional[str] = None

    @field_validator('geom', 'energy')
    def check_is_dataframe(cls, v):
        if v is not None and not isinstance(v, pd.DataFrame):
            raise TypeError("'geom' or 'energy' field must be a DataFrame o None")
        return v
