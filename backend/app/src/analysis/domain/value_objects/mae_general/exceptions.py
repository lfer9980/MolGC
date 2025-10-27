from app.elemental.exceptions import ElementalBaseAppException


class InvalidMAEGeneralID(ElementalBaseAppException):
    def __init__(self, message: str = "MAEGeneral Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEGeneralReport(ElementalBaseAppException):
    def __init__(self, message: str = "MAEGeneral Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEGeneralData(ElementalBaseAppException):
    def __init__(self, message: str = "MAEGeneral Data is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
