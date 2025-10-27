from app.elemental.common import ElementalSchema


class ClassificationFileDTO(ElementalSchema):
    family: str
    variant: str
    software: str
    functional: str
