from app.elemental.common import ElementalSchema


class CreateTopsisDTO(ElementalSchema):
    functional: str
    criteria: dict
    d_ideal: float
    d_not_ideal: float
    closeness: float
    ranking: int
