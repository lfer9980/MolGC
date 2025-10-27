from typing import Any, Dict, Optional


class ElementalBaseAppException(Exception):
    """Base exception for all custom errors in the application."""

    def __init__(
        self,
        message: str = "An error occurred",
        details: Optional[Dict[str, Any]] = None,
        error_code: Optional[str] = None,
    ):
        self.message = message
        self.details = details or {}
        self.error_code = error_code
        super().__init__(self.message)
