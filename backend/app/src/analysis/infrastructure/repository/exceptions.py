from app.elemental.exceptions import ElementalBaseAppException


class InvalidReportIDError(ElementalBaseAppException):
    def __init__(self, message: str = "Invalid Report ID, try again", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
