from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class UnauthorizedError(ElementalBaseAppException):
    """User is not authenticated."""

    def __init__(self, message: str = "User is not authenticated", **kwargs):
        super().__init__(message, error_code="PENDIENTE", **kwargs)


class ForbiddenError(ElementalBaseAppException):
    """User does not have required permissions."""

    def __init__(
        self, message: str = "User does not have required permissions", **kwargs
    ):
        super().__init__(message, error_code="PENDIENTE", **kwargs)
