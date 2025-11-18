from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class ValidationError(ElementalBaseAppException):
    def __init__(self, message: str = "Validation error", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class NotFoundError(ElementalBaseAppException):
    def __init__(self, message: str = "Resource not found", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class DuplicateError(ElementalBaseAppException):
    def __init__(self, message: str = "Resource already exists", **kwargs):
        super().__init__(message, error_code="DUPLICATE_RESOURCE", **kwargs)
