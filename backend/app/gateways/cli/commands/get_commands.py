import importlib
import pkgutil
from logging import Logger

import app.src
import typer
from app.elemental.logging import get_logger

_logger = None


def get_commands_logger() -> Logger:
    global _logger
    if _logger is None:
        _logger = get_logger("commands_logger")
    return _logger


def init_commands(_cli_: typer.Typer) -> None:
    src_path = app.src.__path__

    logger = get_commands_logger()

    for _, module_name, is_pkg in pkgutil.iter_modules(src_path):
        if module_name == "nexus":
            continue

        logger.debug(f"Checking module: {module_name} (pkg: {is_pkg})")

        if not is_pkg:
            continue

        try:
            mod = importlib.import_module(
                f"app.src.{module_name}.interfaces.cli.commands"
            )

            if hasattr(mod, "cli"):
                _cli_.add_typer(mod.cli, name=module_name)
                logger.info(f"Command added: {module_name}")

            else:
                logger.warning(f"No 'cli' instance found in {module_name}")

        except ModuleNotFoundError as e:
            logger.warning(f"CLI not found in {module_name}: {e}")
