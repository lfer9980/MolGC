from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import float_schema

from .exceptions import InvalidMAEVariantValue


class MAEVariantValue(ElementalValueObject):
    __schema_type__ = float_schema()

    def __init__(self, value: float = None):
        self._value = self._validate(value)

    def __float__(self):
        return self._value

    def __repr__(self):
        return f"MAEVariantValue({self._value})"

    def __eq__(self, other):
        return isinstance(other, MAEVariantValue) and self._value == other._value

    @property
    def value(self) -> float:
        return self._value

    @staticmethod
    def _validate(value: float) -> float:
        if not value:
            InvalidMAEVariantValue()

        return value
