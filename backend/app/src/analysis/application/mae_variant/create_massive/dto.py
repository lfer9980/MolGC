from app.elemental.common import ElementalSchema


class CreateMAEVariantDTO(ElementalSchema):
    family: str
    variant: str
    software: str
    functional: str
    reference: str
    value: float
