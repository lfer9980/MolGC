from app.elemental.common import ElementalSchema


class CreateMAEFamilyDTO(ElementalSchema):
    family: str
    data: str
