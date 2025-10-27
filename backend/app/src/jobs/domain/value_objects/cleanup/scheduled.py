from datetime import datetime

from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import datetime_schema

from .exceptions import InvalidCleanupScheduled


class CleanupScheduled(ElementalValueObject):
    __schema_type__ = datetime_schema()

    def __init__(self, value: datetime = None):
        self._value = self._validate(value)

    def __datetime__(self):
        return self._value

    def __repr__(self):
        return f"CleanupScheduled({self._value})"

    def __eq__(self, other):
        return isinstance(other, CleanupScheduled) and self._value == other._value

    @property
    def value(self) -> datetime:
        return self._value

    # TODO: make validation
    @staticmethod
    def _validate(value: datetime) -> datetime:
        if not value:
            InvalidCleanupScheduled()

        return value
