from app.elemental.exceptions import ExternalServiceError


class EmailError(ExternalServiceError):
    """Base exception para errores de email."""

    def __init__(self, message: str = "Email service error", **kwargs):
        super().__init__(message, error_code="EMAIL_ERROR", **kwargs)


class EmailConnectionError(EmailError):
    """Error de conexión SMTP."""

    def __init__(self, message: str = "Email connection error", **kwargs):
        super().__init__(message, error_code="EMAIL_CONNECTION_ERROR", **kwargs)


class EmailTemplateError(EmailError):
    """Error de template de email."""

    def __init__(self, message: str = "Email template error", **kwargs):
        super().__init__(message, error_code="EMAIL_TEMPLATE_ERROR", **kwargs)


class EmailValidationError(EmailError):
    """Error de validación de email."""

    def __init__(self, message: str = "Email validation error", **kwargs):
        super().__init__(message, error_code="EMAIL_VALIDATION_ERROR", **kwargs)


class EmailSendError(EmailError):
    """Error enviando email."""

    def __init__(self, message: str = "Failed to send email", **kwargs):
        super().__init__(message, error_code="EMAIL_SEND_ERROR", **kwargs)
