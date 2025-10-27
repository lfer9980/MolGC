from app.elemental.common import ElementalSchema


class VariantCountDTO(ElementalSchema):
    variant: str
    count: int


class FamilyGroupDTO(ElementalSchema):
    family: str
    variants: list[VariantCountDTO]
