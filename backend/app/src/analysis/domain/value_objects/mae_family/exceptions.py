from app.elemental.exceptions import ElementalBaseAppException


class InvalidMAEFamilyID(ElementalBaseAppException):
    def __init__(self, message: str = "MAEFamily Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEFamilyReport(ElementalBaseAppException):
    def __init__(self, message: str = "MAEFamily Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEFamilyFamily(ElementalBaseAppException):
    def __init__(self, message: str = "MAEFamily Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEFamilyData(ElementalBaseAppException):
    def __init__(self, message: str = "MAEFamily DATA is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
