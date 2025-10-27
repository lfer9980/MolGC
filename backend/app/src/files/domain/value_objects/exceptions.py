from app.elemental.exceptions import ElementalBaseAppException


class InvalidFileID(ElementalBaseAppException):
    def __init__(self, message: str = "File ID is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileJob(ElementalBaseAppException):
    def __init__(self, message: str = "File Job is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFilePath(ElementalBaseAppException):
    def __init__(self, message: str = "File Path is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileFamily(ElementalBaseAppException):
    def __init__(self, message: str = "File Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileVariant(ElementalBaseAppException):
    def __init__(self, message: str = "File Variant is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileSoftware(ElementalBaseAppException):
    def __init__(self, message: str = "File Software is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileFunctional(ElementalBaseAppException):
    def __init__(self, message: str = "File Functional is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileName(ElementalBaseAppException):
    def __init__(self, message: str = "File Name is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileChecksum(ElementalBaseAppException):
    def __init__(self, message: str = "File Checksum is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidFileSize(ElementalBaseAppException):
    def __init__(self, message: str = "File Size is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
