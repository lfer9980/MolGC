from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class WeakPasswordError(ElementalBaseAppException):
    """Password does not meet security requirements."""

    def __init__(
        self, message: str = "Password does not meet security requirements", **kwargs
    ):
        super().__init__(message, error_code="PENDIENTE", **kwargs)


class PasswordMismatchError(ElementalBaseAppException):
    """Password and confirmation password do not match."""

    def __init__(
        self, message: str = "Password and confirmation password do not match", **kwargs
    ):
        super().__init__(message, error_code="PASSWORD_MISMATCH", **kwargs)
