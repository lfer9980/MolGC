from app.elemental.exceptions import ElementalBaseAppException


class InvalidStructureID(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidStructureReport(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidStructureFamily(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidStructureVariant(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Variant is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidStructureReference(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Reference is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidStructureData(ElementalBaseAppException):
    def __init__(self, message: str = "Structure Data is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
