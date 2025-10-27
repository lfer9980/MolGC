from typing import Optional

from app.elemental.common import ElementalValueObject
from pydantic_core.core_schema import dict_schema

from .exceptions import InvalidTopsisCriteria


class TopsisCriteria(ElementalValueObject):
    __schema_type__ = dict_schema()

    def __init__(self, value: Optional[dict] = None):
        if value is None:
            value = {}
        self._value = self._validate(value)

    def __repr__(self):
        return f"TopsisCriteria({self._value})"

    def __eq__(self, other):
        return isinstance(other, TopsisCriteria) and self._value == other._value

    @property
    def value(self) -> dict:
        return self._value

    def dict(self) -> dict:
        return self._value

    def json(self) -> str:
        import json

        return json.dumps(self._value)

    @staticmethod
    def _validate(value: dict) -> dict:
        if not isinstance(value, dict):
            raise InvalidTopsisCriteria("TopsisCriteria must be a dict")
        return value
