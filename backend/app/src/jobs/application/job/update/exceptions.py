from app.elemental.exceptions import ElementalBaseAppException


class JobNotFoundError(ElementalBaseAppException):
    def __init__(self, message: str = "Job not found", **kwargs):
        super().__init__(message, error_code="JOB_NOT_FOUND", **kwargs)
