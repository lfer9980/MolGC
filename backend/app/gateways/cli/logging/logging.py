import time
from functools import wraps
from logging import Logger

from app.elemental.logging import get_logger

_logger = None


def get_commands_logger() -> Logger:
    global _logger
    if _logger is None:
        _logger = get_logger("command_cli_logger")
    return _logger


def log_cli_command(func):
    """Decorator para registrar logs estilo middleware en CLI."""

    logger = get_commands_logger()

    @wraps(func)
    def wrapper(*args, **kwargs):
        command_name = func.__name__
        logger.info(f"CLI Command Started: {command_name}()")
        start_time = time.time()

        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            logger.info(f"CLI Command Finished: {command_name}() in {duration:.2f}s")
            return result

        except Exception as e:
            logger.exception(f"CLI Command Failed: {command_name}() - {e}")
            raise

    return wrapper
