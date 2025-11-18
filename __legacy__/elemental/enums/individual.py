from elemental.common.enums import ElementalStrEnum


class FuncEnum(ElementalStrEnum):
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
