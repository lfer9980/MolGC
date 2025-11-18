from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class ConfigurationError(ElementalBaseAppException):
    def __init__(self, message: str = "Configuration error", **kwargs):
        super().__init__(message, error_code="CONFIGURATION_ERROR", **kwargs)


class RateLimitError(ElementalBaseAppException):
    def __init__(self, message: str = "Rate limit exceeded", **kwargs):
        super().__init__(message, error_code="RATE_LIMIT_EXCEEDED", **kwargs)
