import inspect
from contextlib import asynccontextmanager

from app.elemental.logging import get_logger

# Integration for Celery
from app.elemental.sockets import WebSocketManager
from app.elemental.tasks.services import PubSubInMemory
from app.infrastructure.database.sql import close_database, init_database
from app.settings import settings
from fastapi import FastAPI

_logger = None


def get_middleware_logger():
    global _logger
    if _logger is None:
        _logger = get_logger("fastapi_lifespan_logger")
    return _logger


@asynccontextmanager
async def app_lifespan(_app_: FastAPI):
    logger = get_middleware_logger()

    #  ------------------ Celery integration  ------------------
    use_redis = getattr(settings.celery, "use_redis", False)
    if use_redis:
        try:
            from app.elemental.tasks.services import PubSubRedis

            redis_url = getattr(settings.celery, "redis_url", None) or getattr(
                settings, "REDIS_URL", None
            )
            if not redis_url:
                raise RuntimeError(
                    "use_redis=True but there is not settings.celery.redis_url and settings.REDIS_URL defined."
                )

            _app_.state.pubsub = PubSubRedis(redis_url)
            logger.info("Initialized Redis PubSub at %s", redis_url)

        except Exception as exc:
            logger.exception(
                "Failed initializing Redis PubSub, falling back to InMemoryPubSub: %s",
                exc,
            )
            # fallback to inMemory Service
            _app_.state.pubsub = PubSubInMemory()
            logger.info("Initialized InMemoryPubSub (fallback).")
    else:
        # initializes in-memory shared instance on dev
        _app_.state.pubsub = PubSubInMemory()
        logger.info(f"Initializing InMemoryPubSub Service")

    #  ------------------ WebSockets Integration ------------------
    try:
        _app_.state.ws_manager = WebSocketManager(_app_.state.pubsub)
        logger.info("Initializing WebSocketManager")

    except Exception as exc:
        logger.exception(f"Error Initializing WebSocketManager: {exc}")

    # ------------------ database initialization ---------------
    if not hasattr(settings, "database"):
        logger.warning(
            "Skipping database initialization: no valid settings.database configuration found."
        )
        yield
        return

    try:
        logger.info("Initializing database...")
        await init_database(settings.database)
        yield

    finally:
        logger.info("Shutting down database...")
        try:
            await close_database()
        except Exception:
            logger.exception("Error closing database")

        # closing / cleaning pubsub if it has close attribute
        pubsub = getattr(_app_.state, "pubsub", None)
        if pubsub:
            close = getattr(pubsub, "close", None)
            if close:
                try:
                    if inspect.iscoroutinefunction(close):
                        await close()
                    else:
                        res = close()
                        if inspect.isawaitable(res):
                            await res

                except Exception as exc:
                    logger.exception("Error closing pubsub: %s", exc)

        # cleanup ws_manager
        ws_manager = getattr(_app_.state, "ws_manager", None)
        if ws_manager:
            shutdown_fn = getattr(ws_manager, "shutdown", None)
            if shutdown_fn:
                try:
                    if inspect.iscoroutinefunction(shutdown_fn):
                        await shutdown_fn()
                    else:
                        res = shutdown_fn()
                        if inspect.isawaitable(res):
                            await res
                except Exception as exc:
                    logger.exception("Error shutting down WebSocketManager: %s", exc)

        logger.info("Application shutdown complete")
