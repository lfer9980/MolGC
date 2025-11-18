import traceback
from typing import Any, Dict, Optional

from .__elemental__.base import ElementalBaseAppException
from .application.application import ConfigurationError, RateLimitError
from .infrastructure.database import DatabaseError
from .infrastructure.external import ExternalServiceError
from .security.auth import AuthenticationError
from .usecase.validations import DuplicateError, NotFoundError, ValidationError


def log_exception(
    exc: Exception, context: Optional[Dict[str, Any]] = None, level: str = "error"
) -> None:
    """Registra la excepción con contexto adicional.

    Args:
        exc: Excepción a registrar
        context: Información adicional para el log
        level: Nivel de log (error, warning, info)
    """
    context = context or {}

    log_data = {
        "exception_type": type(exc).__name__,
        "message": str(exc),
        "traceback": traceback.format_exc(),
        **context,
    }

    if isinstance(exc, ElementalBaseAppException):
        log_data.update({"error_code": exc.error_code, "details": exc.details})

    # getattr(logger, level)(f"Exception occurred: {log_data}")


def format_exception_response(exc: ElementalBaseAppException) -> Dict[str, Any]:
    """Formatea la excepción para la respuesta API.

    Args:
        exc: Excepción de la aplicación

    Returns:
        Diccionario con información formateada del error
    """
    return {
        "error": True,
        "error_code": exc.error_code,
        "message": exc.message,
        "details": exc.details,
    }


def is_retriable_error(exc: Exception) -> bool:
    """Indica si el error es recuperable y puede reintentarse.

    Args:
        exc: Excepción a evaluar

    Returns:
        True si el error es recuperable
    """
    retriable_errors = (
        ExternalServiceError,
        DatabaseError,
        RateLimitError,
    )
    return isinstance(exc, retriable_errors)


def get_error_severity(exc: Exception) -> str:
    """Obtiene el nivel de severidad del error.

    Args:
        exc: Excepción a analizar

    Returns:
        Nivel de severidad: 'low', 'medium', 'high', 'critical'
    """
    if isinstance(exc, (ValidationError, NotFoundError)):
        return "low"
    elif isinstance(exc, (DuplicateError, PermissionError, AuthenticationError)):
        return "medium"
    elif isinstance(exc, (DatabaseError, ExternalServiceError)):
        return "high"
    elif isinstance(exc, (ConfigurationError, RateLimitError)):
        return "critical"
    else:
        return "medium"


class ElementalExceptionHandler:
    """Manejador genérico de excepciones."""

    def __init__(self, log_exceptions: bool = True):
        self.log_exceptions = log_exceptions

    def handle(
        self, exc: Exception, context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Maneja la excepción de forma genérica.

        Args:
            exc: Excepción a manejar
            context: Contexto adicional

        Returns:
            Respuesta de error formateada
        """
        if self.log_exceptions:
            severity = get_error_severity(exc)
            log_level = "error" if severity in ["high", "critical"] else "warning"
            log_exception(exc, context, log_level)

        if isinstance(exc, ElementalBaseAppException):
            return format_exception_response(exc)

        # Para excepciones desconocidas
        return {
            "error": True,
            "error_code": "UNKNOWN_ERROR",
            "message": "An unexpected error occurred",
            "details": {},
        }
