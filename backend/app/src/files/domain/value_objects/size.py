from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import int_schema

from .exceptions import InvalidFileSize


class FileSize(ElementalValueObject):
    __schema_type__ = int_schema()

    def __init__(self, value: int = None):
        self._value = self._validate(value)

    def __int__(self):
        return self._value

    def __repr__(self):
        return f"FileSize({self._value})"

    def __eq__(self, other):
        return isinstance(other, FileSize) and self._value == other._value

    @property
    def value(self) -> int:
        return self._value

    @staticmethod
    def _validate(value: int) -> int:
        if not value:
            InvalidFileSize()

        return value
