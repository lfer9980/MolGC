from app.elemental.exceptions import ElementalBaseAppException


class DataLoaderError(ElementalBaseAppException):
    def __init__(
        self, message: str = "An error just happened loading your data", **kwargs
    ):
        super().__init__(message, error_code="DATA LOADER ERROR", **kwargs)


class DataProcessError(ElementalBaseAppException):
    def __init__(
        self, message: str = "An error just happened Processing your data", **kwargs
    ):
        super().__init__(message, error_code="DATA LOADER ERROR", **kwargs)
