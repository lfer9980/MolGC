from app.elemental.exceptions import ElementalBaseAppException


class UploadedLargeFileError(ElementalBaseAppException):
    def __init__(self, message: str = "Uploaded File is too large", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class FileAlreadyExistsError(ElementalBaseAppException):
    def __init__(self, message: str = "File Already Exists on backend", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
