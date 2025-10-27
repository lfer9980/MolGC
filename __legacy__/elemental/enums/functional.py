from pydantic import BaseModel

from elemental.enums import FuncEnum


class FunctionalModel(BaseModel):
    """

    """
    software: FuncEnum
    functional: str
