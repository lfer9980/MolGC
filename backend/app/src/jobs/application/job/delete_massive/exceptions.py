from app.elemental.exceptions import ElementalBaseAppException


class JobNotFoundError(ElementalBaseAppException):
    def __init__(self, message: str = "Job not found", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class DeleteFileError(ElementalBaseAppException):
    def __init__(
        self, message: str = "An error just happened during file deletion", **kwargs
    ):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
