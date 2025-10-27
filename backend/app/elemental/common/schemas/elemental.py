from pydantic import BaseModel


class ElementalSchema(BaseModel):
    """Base schema for the application, extending Pydantic's `BaseModel`.

    This base class provides a common configuration for all schemas in the application,
    ensuring consistent functionality and enabling additional features.

    Inner Class:
        Config:
            - `from_attributes` (bool): Enables Pydantic models to be validated and
              created from objects with attributes (such as ORM models).

    Example:
        ```
        class Example(ElementalSchema):
            id: int
            name: str

        class ORMModel:
            id = 1
            name = "Example"

        instance = ORMModel()
        validated = Example.model_validate(instance)
        ```
    """

    class Config:
        from_attributes = True
