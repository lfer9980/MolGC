from elemental.enums import FuncEnum
from pydantic import BaseModel


class FunctionalModel(BaseModel):
    """"""

    software: FuncEnum
    functional: str
