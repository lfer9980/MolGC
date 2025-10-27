from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class AuthenticationError(ElementalBaseAppException):
    def __init__(self, message: str = "Authentication failed", **kwargs):
        super().__init__(message, error_code="AUTHENTICATION_FAILED", **kwargs)
