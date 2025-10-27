from app.elemental.exceptions import ElementalBaseAppException


class InvalidRMSDID(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDReport(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDFamily(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDVariant(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Variant is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDFunctional(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Functional is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDSoftware(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Software is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDReference(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Reference is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidRMSDValue(ElementalBaseAppException):
    def __init__(self, message: str = "RMSD Value is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
