import importlib
import pkgutil

from app.elemental.logging import get_logger
from app.src import __path__ as src_path
from fastapi import APIRouter

_logger = None


def get_router_logger():
    global _logger
    if _logger is None:
        _logger = get_logger("api_routers")
    return _logger


def get_all_routers() -> list[APIRouter]:
    logger = get_router_logger()

    all_applications_routers: list[APIRouter] = []

    for _, module_name, is_pkg in pkgutil.iter_modules(src_path):
        if module_name == "nexus":
            continue

        if not is_pkg:
            continue

        try:
            mod = importlib.import_module(
                f"app.src.{module_name}.interfaces.api.router"
            )

            if mod == "__shared__":
                continue

            if hasattr(mod, "api_router"):
                all_applications_routers.append(mod.api_router)
                logger.info(f"Router added: {module_name}")

            else:
                logger.warning(f"No 'api_router' found on {module_name}")

        except ModuleNotFoundError as e:
            logger.error(f"No router.py on {module_name}: {e}")

    return all_applications_routers
