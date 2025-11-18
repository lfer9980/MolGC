import logging
import sys
from logging.handlers import RotatingFileHandler
from pathlib import Path

from .formatters import get_formatter

_LOGGER_REGISTRY = {}  # Evita múltiples instancias por nombre


def setup_logger(name: str = "global_logger") -> logging.Logger:
    """Setup logger with console and file handlers."""
    if name in _LOGGER_REGISTRY:
        return _LOGGER_REGISTRY[name]

    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)
    logger.propagate = False

    # Limpieza por seguridad
    logger.handlers.clear()

    # Formatters
    console_formatter = get_formatter("colored")
    file_formatter = get_formatter("detailed")

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(console_formatter)

    # File handler
    log_file = Path("logs/app.log")
    log_file.parent.mkdir(parents=True, exist_ok=True)

    file_handler = RotatingFileHandler(log_file, maxBytes=1_000_000, backupCount=5)
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(file_formatter)

    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    _LOGGER_REGISTRY[name] = logger
    return logger


def get_logger(name: str = None) -> logging.Logger:
    """Get or create a logger instance."""
    return setup_logger(name or "global_logger")


# Logger global para importar directo
logger = get_logger()
