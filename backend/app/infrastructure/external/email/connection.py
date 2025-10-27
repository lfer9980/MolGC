"""Email Connection Helpers Factory functions para crear EmailService
fácilmente."""

from logging import Logger
from pathlib import Path
from typing import Any, Dict, Optional

from app.elemental.logging import get_logger

from .core.exceptions import EmailConnectionError
from .core.service import EmailService
from .settings import EmailSettings

# from ..core.service import EmailService
# from ..core.settings import EmailSettings
# from ..core.exceptions import EmailConnectionError

_logger = None
_email_service: Optional[EmailService] = None


def get_email_logger() -> Logger:
    global _logger
    if _logger is None:
        _logger = get_logger("email_logger")
    return _logger


def create_email_service(
    templates_dir: Path,
    templates_context: Dict[str, Dict[str, Any]],
    email_settings: EmailSettings,
) -> EmailService:
    """Factory function para crear EmailService.

    Args:
        templates_dir: Directorio de templates HTML
        templates_context: Registry de templates
        email_settings: Configuración SMTP

    Returns:
        EmailService: Instancia configurada
    """
    logger = get_email_logger()

    logger.info("Creating EmailService...")

    return EmailService(
        templates_dir=templates_dir,
        templates_context=templates_context,
        logger=logger,
        smtp_server=email_settings.server,
        smtp_port=email_settings.port,
        username=email_settings.username,
        password=email_settings.password,
        sender=email_settings.sender,
        use_tls=email_settings.use_tls,
        use_ssl=email_settings.use_ssl,
        timeout=email_settings.timeout,
    )


def create_email_service_from_config(
    templates_dir: Path,
    templates_context: Dict[str, Dict[str, Any]],
    smtp_server: str,
    smtp_port: int = 587,
    username: str = "",
    password: str = "",
    sender: str = "",
    use_tls: bool = True,
    use_ssl: bool = False,
    timeout: int = 30,
) -> EmailService:
    """Factory function con parámetros directos.

    Args:
        templates_dir: Directorio de templates
        templates_context: Registry de templates
        smtp_server: Servidor SMTP
        smtp_port: Puerto SMTP
        username: Usuario SMTP
        password: Contraseña SMTP
        sender: Email remitente
        use_tls: Usar STARTTLS
        use_ssl: Usar SSL/TLS
        timeout: Timeout de conexión

    Returns:
        EmailService: Instancia configurada
    """
    logger = get_email_logger()

    logger.info(f"Creating EmailService for {smtp_server}:{smtp_port}")

    return EmailService(
        templates_dir=templates_dir,
        templates_context=templates_context,
        logger=logger,
        smtp_server=smtp_server,
        smtp_port=smtp_port,
        username=username,
        password=password,
        sender=sender,
        use_tls=use_tls,
        use_ssl=use_ssl,
        timeout=timeout,
    )


def init_global_email_service(
    templates_dir: Path,
    templates_context: Dict[str, Dict[str, Any]],
    email_settings: EmailSettings,
) -> EmailService:
    """Inicializar servicio de email global.

    Args:
        templates_dir: Directorio de templates
        templates_context: Registry de templates
        email_settings: Configuración SMTP

    Returns:
        EmailService: Instancia global
    """
    global _email_service
    logger = get_email_logger()

    try:
        logger.info("Initializing global email service...")

        _email_service = create_email_service(
            templates_dir=templates_dir,
            templates_context=templates_context,
            email_settings=email_settings,
        )

        logger.info("Global email service initialized")
        return _email_service

    except Exception as e:
        logger.error(f"Failed to initialize global email service: {e}")
        raise EmailConnectionError(f"Failed to initialize email service: {e}")


def get_email_service() -> EmailService:
    """Obtener instancia global del email service.

    Returns:
        EmailService: Instancia global

    Raises:
        EmailConnectionError: Si no se ha inicializado el servicio
    """
    if not _email_service:
        raise EmailConnectionError(
            "Email service not initialized. Call init_global_email_service() first."
        )

    return _email_service


def is_email_service_initialized() -> bool:
    """Verificar si el servicio global está inicializado.

    Returns:
        bool: True si está inicializado
    """
    return _email_service is not None


def reset_email_service() -> None:
    """Reset del servicio global (útil para testing)"""
    global _email_service

    logger = get_email_logger()

    logger.info("Resetting global email service...")
    _email_service = None
