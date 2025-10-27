from app.elemental.common import ElementalSchema


class CreateStructureDTO(ElementalSchema):
    family: str
    variant: str
    reference: str
    data: str
