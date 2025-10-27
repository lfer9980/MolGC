from app.elemental.common import ElementalSchema


class ClassificationFileDTO(ElementalSchema):
    # TODO: validate allowed algorithms with an enum
    family: str
    variant: str
    software: str
    functional: str
