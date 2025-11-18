from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import str_schema

from .exceptions import InvalidStructureFamily


class StructureFamily(ElementalValueObject):
    __schema_type__ = str_schema()

    def __init__(self, value: str = None):
        self._value = self._validate(value)

    def __str__(self):
        return self._value

    def __repr__(self):
        return f"StructureFamily({self._value})"

    def __eq__(self, other):
        return isinstance(other, StructureFamily) and self._value == other._value

    @property
    def value(self) -> str:
        return self._value

    @staticmethod
    def _validate(value: str) -> str:
        if not value:
            InvalidStructureFamily()

        return value
