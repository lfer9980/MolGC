from app.elemental.exceptions import ElementalBaseAppException


class InvalidReportID(ElementalBaseAppException):
    def __init__(self, message: str = "Report Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportJob(ElementalBaseAppException):
    def __init__(self, message: str = "Report Job is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportType(ElementalBaseAppException):
    def __init__(self, message: str = "Report Type is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportScope(ElementalBaseAppException):
    def __init__(self, message: str = "Report Scope is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportFamily(ElementalBaseAppException):
    def __init__(self, message: str = "Report Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportVariant(ElementalBaseAppException):
    def __init__(self, message: str = "Report Variant is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidReportTitle(ElementalBaseAppException):
    def __init__(self, message: str = "Report Title is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
