from datetime import datetime

from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import datetime_schema

from .exceptions import InvalidJobUpdated


class JobUpdated(ElementalValueObject):
    __schema_type__ = datetime_schema()

    def __init__(self, value: datetime = None):
        if not isinstance(value, datetime):
            raise InvalidJobUpdated("expires_at debe ser un datetime")
        self._value = value

    def __datetime__(self):
        return self._value

    def __repr__(self):
        return f"JobUpdated({self._value})"

    def __eq__(self, other):
        return isinstance(other, JobUpdated) and self._value == other._value

    @property
    def value(self) -> datetime:
        return self._value

    @staticmethod
    def _validate(value: datetime) -> datetime:
        if not value:
            InvalidJobUpdated()

        return value
