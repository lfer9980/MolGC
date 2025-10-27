from app.elemental.exceptions import ElementalBaseAppException


class GenericError(ElementalBaseAppException):
    def __init__(self, message: str = "Generic not found", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
