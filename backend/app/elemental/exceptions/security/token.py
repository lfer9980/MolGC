from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class TokenExpiredError(ElementalBaseAppException):
    """Token has expired."""

    def __init__(self, message: str = "Token has expired", **kwargs):
        super().__init__(message, error_code="PENDIENTE", **kwargs)


class InvalidTokenError(ElementalBaseAppException):
    """Token is invalid or malformed."""

    def __init__(self, message: str = "Token is invalid or malformed", **kwargs):
        super().__init__(message, error_code="PENDIENTE", **kwargs)
