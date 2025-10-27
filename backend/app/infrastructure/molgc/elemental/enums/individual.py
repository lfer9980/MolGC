from app.infrastructure.molgc.elemental.common.enums import ElementalStrEnum


class SoftEnum(ElementalStrEnum):
    """"""

    CASTEP = "Castep"
    FHI = "FHI-aims"
    GAUSSIAN = "Gaussian"
    CRYSTALS = "Crystals"


class ExtEnum(ElementalStrEnum):
    """"""

    CASTEP = "castep"
    FHI = "out"
    GAUSSIAN = "log"
    CRYSTALS = "xyz"
