from .__elemental__.base import ElementalBaseAppException
from .application.application import ConfigurationError, RateLimitError
from .infrastructure.database import DatabaseError
from .infrastructure.external import ExternalServiceError
from .security.auth import AuthenticationError
from .security.password import PasswordMismatchError, WeakPasswordError
from .security.permissions import ForbiddenError, UnauthorizedError
from .security.token import InvalidTokenError, TokenExpiredError
from .usecase.validations import DuplicateError, NotFoundError, ValidationError
from .utils import ElementalExceptionHandler

__all__ = [
    "ElementalBaseAppException",
    "ConfigurationError",
    "RateLimitError",
    "DatabaseError",
    "ExternalServiceError",
    "AuthenticationError",
    "WeakPasswordError",
    "PasswordMismatchError" "UnauthorizedError",
    "ForbiddenError",
    "TokenExpiredError",
    "InvalidTokenError",
    "ValidationError",
    "NotFoundError",
    "DuplicateError",
    "ElementalExceptionHandler",
]
