from app.elemental.exceptions import ElementalBaseAppException


class InvalidJobIDError(ElementalBaseAppException):
    def __init__(
        self, message: str = "The JOB ID is incorrect or does not exists", **kwargs
    ):
        super().__init__(message, error_code="JOB_NOT_FOUND", **kwargs)
