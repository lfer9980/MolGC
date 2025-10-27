from app.elemental.common import ElementalSchema


class CreateRMSDDTO(ElementalSchema):
    family: str
    variant: str
    reference: str
    software: str
    functional: str
    value: float
