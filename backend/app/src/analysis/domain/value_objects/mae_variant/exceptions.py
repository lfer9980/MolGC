from app.elemental.exceptions import ElementalBaseAppException


class InvalidMAEVariantID(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantReport(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantFamily(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Family is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantVariant(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Variant is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantFunctional(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Functional is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantSoftware(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Software is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantReference(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Reference is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidMAEVariantValue(ElementalBaseAppException):
    def __init__(self, message: str = "MAEVariant Value is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
