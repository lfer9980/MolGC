from app.elemental.exceptions import ElementalBaseAppException


class InvalidCleanupID(ElementalBaseAppException):
    def __init__(self, message: str = "Cleanup ID is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidCleanupJob(ElementalBaseAppException):
    def __init__(self, message: str = "Cleanup Job is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidCleanupScheduled(ElementalBaseAppException):
    def __init__(self, message: str = "Cleanup Scheduled At is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
