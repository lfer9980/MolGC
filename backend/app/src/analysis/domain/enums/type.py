from app.elemental.common import ElementalStrEnum


class ReportTypeEnum(ElementalStrEnum):
    MAE_GENERAL = "mae_general"
    MAE_FAMILY = "mae_family"
    MAE_VARIANT = "mae_variant"
    RMSD = "rmsd"
    STRUCTURE = "structure"
    TOPSIS = "topsis"
