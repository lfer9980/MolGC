from app.elemental.common import ElementalSchema


class FamilyGroupDTO(ElementalSchema):
    family: str
    variants: dict[str, int]
