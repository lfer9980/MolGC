import asyncio
import importlib
import pkgutil
import sys
from datetime import timedelta

import app.src as app
from app.elemental.logging import get_logger
from app.infrastructure.database.sql import close_database, init_database
from app.settings import settings
from celery import Celery
from celery.signals import worker_process_init, worker_shutdown
from threading import Lock


_logger = None

_worker_loop = None
_loop_lock = Lock()


def get_celery_logger():
    global _logger
    if _logger is None:
        _logger = get_logger("celery_logger")
    return _logger


def make_celery():
    celery_app = Celery("worker")

    base_config = dict(
        task_serializer="json",
        result_serializer="json",
        accept_content=["json"],
        enable_utc=True,
    )

    if getattr(settings.celery, "use_redis", False):
        broker_url = settings.celery.broker_url
        backend_url = settings.celery.result_backend

        celery_app.conf.update(base_config)
        celery_app.conf.update(broker_url=broker_url, result_backend=backend_url)
    else:
        celery_app.conf.update(base_config)
        celery_app.conf.update(broker_url="memory://", result_backend="rpc://")
        celery_app.conf.task_always_eager = True
        celery_app.conf.task_eager_propagates = True

    return celery_app


celery = make_celery()

def get_or_create_event_loop():
    """Get or create a persistent event loop for the worker process."""
    global _worker_loop
    
    with _loop_lock:
        if _worker_loop is None or _worker_loop.is_closed():
            _worker_loop = asyncio.new_event_loop()
            asyncio.set_event_loop(_worker_loop)
        return _worker_loop


@worker_process_init.connect
def init_worker_db(**kwargs):
    """Initialize the database connections to Celery Process, if the flag
    "use_database" is true."""
    logger = get_celery_logger()

    try:
        if getattr(settings.celery, "use_database", False):
            db_settings = settings.database
            logger.info("Initializing database for worker process...")

            loop = get_or_create_event_loop()
            loop.run_until_complete(init_database(db_settings))

            logger.info("Database initialized successfully.")
        else:
            logger.info("Skipping database initialization (use_database=False).")

    except Exception as e:
        logger.error(f"Error initializing database: {e}")


@worker_shutdown.connect
def shutdown_worker_db(**kwargs):
    """Close database connections to Celery Process when worker is shutdown, if
    the flag "use_database" is true."""
    logger = get_celery_logger()

    global _worker_loop

    try:
        if getattr(settings.celery, "use_database", False):
            logger.info("Closing database connection...")

            loop = get_or_create_event_loop()
            loop.run_until_complete(close_database())

            if _worker_loop and not _worker_loop.is_closed():
                _worker_loop.close()
                _worker_loop = None

            logger.info("Database connection closed.")
        else:
            logger.info("Skipping database shutdown (use_database=False).")

    except Exception as e:
        logger.error(f"Error closing database: {e}")


def discover_and_import_tasks():
    """Auto-discover tasks modules under
    app.src.<module>.infrastructure.celery.tasks."""
    logger = get_celery_logger()

    for _, modname, is_pkg in pkgutil.iter_modules(app.__path__):
        module_path = f"app.src.{modname}.infrastructure.celery"
        try:
            importlib.import_module(module_path)
            logger.info(f"[celery_app] Imported tasks from {module_path}")
        except ModuleNotFoundError:
            continue
        except Exception as exc:
            logger.error(f"[celery_app] error importing {module_path}: {exc}")


def register_and_discover_schedules():
    """Auto-discover and register periodic tasks dynamically,"""
    logger = get_celery_logger()

    for _, modname, is_pkg in pkgutil.iter_modules(app.__path__):
        module_path = f"app.src.{modname}.infrastructure.schedules"
        try:
            module = importlib.import_module(module_path)

            if hasattr(module, "beat_schedules"):
                schedules = getattr(module, "beat_schedules")
                if isinstance(schedules, dict):
                    for name, schedule_conf in schedules.items():
                        celery.conf.beat_schedule[name] = schedule_conf
                    logger.info(
                        f"[celery_app] Registered {len(schedules)} periodic tasks from {module_path}"
                    )
        except ModuleNotFoundError:
            continue
        except Exception as exc:
            logger.error(
                f"[celery_app] Error importing schedules from {module_path}: {exc}"
            )


# Decide if we should run discovery:
# Run discovery for both worker and beat processes
_RUN_DISCOVER_ARG = any(arg in ["worker", "beat"] for arg in sys.argv)

if _RUN_DISCOVER_ARG:
    discover_and_import_tasks()
    register_and_discover_schedules()
