from abc import ABC, abstractmethod
from typing import Any

from pydantic import GetCoreSchemaHandler
from pydantic_core.core_schema import CoreSchema, no_info_after_validator_function


class ElementalValueObject(ABC):
    """Abstract base class for creating strongly-typed value objects with
    validation logic.

    This class enforces the use of custom schema types and input validation logic, ensuring all subclasses
    define structured validation mechanisms. It integrates with Pydantic's Core Schema to allow seamless
    use in applications using Pydantic models.

    Attributes:
        __schema_type__ (dict or None): The schema type for the value object. Subclasses must define this
            attribute using Pydantic Core's schema functions.

    Abstract Methods:
        - `_validate(value: Any) -> Any`: Static method to validate and potentially convert the input value.
            This must be implemented in subclasses.

    Methods:
        - `schema_type(cls) -> dict`: Returns the defined `__schema_type__` attribute for the value object.
        - `__get_pydantic_core_schema__(cls, _source: type[Any], _handler: GetCoreSchemaHandler) -> CoreSchema`:
            Returns the CoreSchema for Pydantic, defining how the schema should validate values.

    Raises:
        ValueError: If `__schema_type__` is not set or is not a dictionary.

    Usage Example:
        ```
        from pydantic_core.core_schema import string_schema
        from app.value_objects.base_value_object import BaseValueObject

        class PhoneNumber(BaseValueObject):
            __schema_type__ = string_schema(min_length=10, max_length=15)

            def __init__(self, value):
                self.value = self._validate(value)

            @staticmethod
            def _validate(value: Any) -> str:
                if not value.isdigit():
                    raise ValueError("Phone number must contain only digits.")
                return value

        phone = PhoneNumber()
        schema = phone.__get_pydantic_core_schema__(str, None)
        ```
    """

    __schema_type__ = None

    def __init_subclass__(cls):
        """Lifecycle hook for initializing a subclass.

        This method ensures that any subclass of `BaseValueObject` defines a valid `__schema_type__`.
        """
        if cls.__schema_type__ is None:
            raise ValueError(
                "Schema type must be defined as a function from pydantic_core.core_schema"
            )

        if not isinstance(cls.__schema_type__, dict):
            raise ValueError(
                "Schema type must be defined as a function from pydantic_core.core_schema"
            )

        super().__init_subclass__()

    @classmethod
    def schema_type(cls):
        """Returns the schema type defined in the `__schema_type__` attribute.

        Returns:
            dict: The schema type for the value object.
        """
        return cls.__schema_type__

    @staticmethod
    @abstractmethod
    def _validate(value: Any) -> Any:
        """Abstract method for validating input values.

        Subclasses must implement this method to define custom validation logic.

        Args:
            value (Any): The input value to validate.

        Returns:
            Any: The validated (and potentially transformed) value.

        Raises:
            NotImplementedError: If the method is not implemented in subclasses.
        """
        raise NotImplementedError()

    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source: type[Any], _handler: GetCoreSchemaHandler
    ) -> CoreSchema:
        """Returns the CoreSchema for the value object.

        This method combines the schema type and `_validate` method to define how
        values will be validated and processed.

        Args:
            _source (type[Any]): The source type (unused).
            _handler (GetCoreSchemaHandler): Handler for fetching the schema (unused).

        Returns:
            CoreSchema: The schema for validating the value object.
        """
        return no_info_after_validator_function(cls._validate, cls.schema_type())
