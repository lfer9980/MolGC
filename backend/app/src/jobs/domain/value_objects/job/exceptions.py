from app.elemental.exceptions import ElementalBaseAppException


class InvalidJobID(ElementalBaseAppException):
    def __init__(self, message: str = "Job ID is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobAnalysis(ElementalBaseAppException):
    def __init__(self, message: str = "Job Analysis Type is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobUpload(ElementalBaseAppException):
    def __init__(self, message: str = "Job Upload Type is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobStatus(ElementalBaseAppException):
    def __init__(self, message: str = "Job Status is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobReference(ElementalBaseAppException):
    def __init__(self, message: str = "Job Reference is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobExpires(ElementalBaseAppException):
    def __init__(self, message: str = "Job Expires is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidJobUpdated(ElementalBaseAppException):
    def __init__(self, message: str = "Job Updated is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
