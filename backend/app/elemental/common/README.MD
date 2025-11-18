# Common Types Module

This package defines a structured, extensible, and type-safe foundation for working with value objects, enumerations, and data validation schemas within your application. It integrates tightly with [Pydantic](https://docs.pydantic.dev/) and follows domain-driven design principles.

---

## 📁 Folder Structure

```bash
|-- enums/
|   |-- numerical.py
|   |-- text.py
|   |-- __init__.py
|
|-- schemas/
|   |-- elemental.py
|   |-- __init__.py
|
|-- value_object/
|   |-- elemental.py
|   |-- __init__.py
|
|-- README.md
|-- __init__.py
```

---

## 🔢 `enums/`

### `numerical.py`

Defines `ElementalIntEnum`, a base class for enums with integer values. Useful for database status codes, states, or numeric constants.

```python
class Status(ElementalIntEnum):
    ACTIVE = 1
    INACTIVE = 0
```

Includes a helper method:
- `to_list()`: Returns a list of all enum values.

---

### `text.py`

Defines `ElementalStrEnum`, a base class for enums with string values, ideal for descriptive constants like labels or keys.

```python
class Color(ElementalStrEnum):
    RED = "red"
    GREEN = "green"
```

Also includes:
- `to_list()`: Returns a list of enum members as strings.

---

## 📄 `schemas/`

### `elemental.py`

Contains `ElementalSchema`, a base class for all Pydantic models in the system. It includes a `Config` inner class with:

```python
class Config:
    from_attributes = True
```

This enables automatic validation from objects with attributes (e.g., ORM models), improving integration with persistence layers.

---

## 🧩 `value_object/`

### `elemental.py`

Defines `ElementalValueObject`, an abstract base class for value objects that:

- Enforces custom validation using Pydantic Core Schema.
- Ensures each subclass defines its own validation logic and schema.
- Provides integration with `pydantic-core`.

Usage Example:

```python
class PhoneNumber(ElementalValueObject):
    __schema_type__ = string_schema(min_length=10, max_length=15)

    def __init__(self, value: str):
        self.value = self._validate(value)

    @staticmethod
    def _validate(value):
        if not value.isdigit():
            raise ValueError("Phone number must contain only digits.")
        return value
```

---
