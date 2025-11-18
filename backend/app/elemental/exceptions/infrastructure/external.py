from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class ExternalServiceError(ElementalBaseAppException):
    def __init__(self, message: str = "External service error", **kwargs):
        super().__init__(message, error_code="EXTERNAL_SERVICE_ERROR", **kwargs)
