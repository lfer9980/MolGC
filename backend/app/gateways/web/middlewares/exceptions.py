import os
import time
from typing import Any, Dict, Optional

from app.elemental.exceptions import (
    ElementalBaseAppException,
    ElementalExceptionHandler,
)
from app.elemental.logging import get_logger
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

_logger = None


def get_exception_middleware_logger():
    global _logger
    if _logger is None:
        _logger = get_logger("fastapi_exception_middleware")
    return _logger


class ExceptionMiddleware(BaseHTTPMiddleware):

    logger = get_exception_middleware_logger()

    def __init__(self, app, log_exceptions: bool = True):
        super().__init__(app)
        self.exception_handler = ElementalExceptionHandler(
            log_exceptions=log_exceptions
        )
        self.include_traceback = self._is_development()

    async def dispatch(self, request: Request, call_next):
        try:
            response: Response = await call_next(request)
            return response

        except ElementalBaseAppException as exc:
            return await self._handle_elemental_exception(request, exc)

        except Exception as exc:
            return await self._handle_generic_exception(request, exc)

    async def _handle_elemental_exception(
        self, request: Request, exc: ElementalBaseAppException
    ) -> JSONResponse:
        """Handle ElementalBaseAppException."""

        context = self._build_request_context(request)

        error_response = self.exception_handler.handle(exc, context)

        error_response.update(
            {
                "path": str(request.url.path),
                "method": request.method,
                "timestamp": time.time(),
            }
        )

        status_code = self._get_status_code_from_error_code(exc.error_code)

        self.logger.warning(
            f"ElementalException: {exc.error_code} - {exc.message} "
            f"for {request.method} {request.url}"
        )

        return JSONResponse(status_code=status_code, content=error_response)

    async def _handle_generic_exception(
        self, request: Request, exc: Exception
    ) -> JSONResponse:
        """Handle any other exception."""

        context = self._build_request_context(request)

        # Use your exception handler for generic exceptions
        error_response = self.exception_handler.handle(exc, context)

        # Add request context
        error_response.update(
            {
                "path": str(request.url.path),
                "method": request.method,
                "timestamp": time.time(),
            }
        )

        # Add traceback in development
        if self.include_traceback:
            import traceback

            error_response["details"]["traceback"] = traceback.format_exc().split("\n")[
                -10:
            ]

        self.logger.exception(
            f"Unhandled Exception during request: {request.method} {request.url} - {repr(exc)}"
        )

        return JSONResponse(status_code=500, content=error_response)

    def _build_request_context(self, request: Request) -> Dict[str, Any]:
        """Build request context for logging."""
        return {
            "path": str(request.url.path),
            "method": request.method,
            "client_ip": request.client.host if request.client else None,
            "user_agent": request.headers.get("user-agent"),
            "query_params": dict(request.query_params) if request.query_params else {},
            "timestamp": time.time(),
        }

    def _get_status_code_from_error_code(self, error_code: Optional[str]) -> int:
        """Map your error codes to HTTP status codes."""
        status_mapping = {
            # Validation errors
            "VALIDATION_ERROR": 422,
            "INVALID_INPUT": 400,
            # Authentication/Authorization
            "AUTHENTICATION_ERROR": 401,
            "UNAUTHORIZED": 401,
            "FORBIDDEN": 403,
            "PERMISSION_DENIED": 403,
            # Resource errors
            "NOT_FOUND": 404,
            "RESOURCE_NOT_FOUND": 404,
            "DUPLICATE_ERROR": 409,
            "CONFLICT": 409,
            # Rate limiting
            "RATE_LIMIT_ERROR": 429,
            "TOO_MANY_REQUESTS": 429,
            # External services
            "EXTERNAL_SERVICE_ERROR": 502,
            "SERVICE_UNAVAILABLE": 503,
            # Database errors
            "DATABASE_ERROR": 500,
            "CONNECTION_ERROR": 500,
            # Configuration
            "CONFIGURATION_ERROR": 500,
            "MISSING_CONFIG": 500,
        }

        return status_mapping.get(error_code, 500)

    def _is_development(self) -> bool:
        """Check if running in development environment."""
        env = os.getenv("app_env", "development").lower()
        return env in ["development", "dev", "local", "debug"]


exception_middleware = (ExceptionMiddleware, {"log_exceptions": True})
