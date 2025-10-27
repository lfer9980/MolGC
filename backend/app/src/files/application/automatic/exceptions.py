from app.elemental.exceptions import ElementalBaseAppException


class UploadedLargeFileError(ElementalBaseAppException):
    def __init__(self, message: str = "Uploaded File is too large", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class InvalidZipAbsolutePathError(ElementalBaseAppException):
    def __init__(
        self, message: str = "Zip contiene ruta absoluta no permitida", **kwargs
    ):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class InvalidZipPathError(ElementalBaseAppException):
    def __init__(
        self, message: str = "Zip contiene rutas no permitidas (..)", **kwargs
    ):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class ZipExtractError(ElementalBaseAppException):
    def __init__(
        self, message: str = "Ocurrio un error al extraer los archivos", **kwargs
    ):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)


class InvalidFilesError(ElementalBaseAppException):
    def __init__(self, message: str = "Invalid Files Founded", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
