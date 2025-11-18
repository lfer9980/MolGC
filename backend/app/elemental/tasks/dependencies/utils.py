import json
import logging
from typing import Any, Dict, Union

from app.elemental.tasks.types import TaskPublishType
from app.settings import settings

logger = logging.getLogger("publish_helpers")


def publish_progress_sync(
    channel: str, payload: Union[Dict[str, Any], TaskPublishType]
) -> None:
    """Publish from a synchronous context (e.g., separate Celery worker).

    - If settings.celery.use_redis: use Redis via RedisClient.publish_sync_url (does not depend on app.state).
    - If not: try to use the InMemory pubsub singleton (only works if the worker runs in-process).
    """

    # Format the payload to JSON/string
    try:
        body = payload if isinstance(payload, str) else json.dumps(payload)
    except Exception:
        body = str(payload)

    if getattr(settings.celery, "use_redis", False) and getattr(
        settings.celery, "redis_url", None
    ):
        try:
            # publish_sync_url is a helper that creates a temporary sync client and publishes
            from app.elemental.tasks.services import PubSubRedis

            PubSubRedis.publish_sync_url(settings.celery.redis_url, channel, body)
            return

        except Exception as exc:
            logger.exception(
                "Error publishing to Redis from publish_progress_sync, attempting fallback to InMemory: %s",
                exc,
            )

    # In-memory fallback (only valid if the process shares memory with FastAPI)
    try:
        from app.elemental.tasks.services import PubSubInMemory

        pubsub = PubSubInMemory()
        pubsub.publish_sync(channel, body)
        return

    except Exception as exc:
        logger.exception("publish_progress_sync: fallback in-memory failed: %s", exc)

    logger.warning("publish_progress_sync: Could not publish progress to %s", channel)


async def publish_progress_async(
    channel: str, payload: Dict[str, Any], *, _app_=None, request=None
) -> None:
    """Publish from an async context (FastAPI handlers).

    - If request or app is passed and _app_.state.pubsub exists: use it (ideal).
    - If you use_redis=True and there is no app.state: try to create RedisClient async and publish.
    - If you use_redis=False: try to use InMemory async publish.
    """
    try:
        body = payload if isinstance(payload, str) else json.dumps(payload)
    except Exception:
        body = str(payload)

    # this for load from app.state instead of PubSubRedis / InMemoryService
    _app = None
    if request is not None:
        _app = request.app
    elif _app_ is not None:
        _app = _app_

    if _app is not None:
        pubsub = getattr(_app.state, "pubsub", None)
        if pubsub:
            # pubsub must expose async publish(channel, message)
            try:
                # many implementations accept dict or str; normalize to dict/string as you prefer
                await pubsub.publish(channel, body)
                return
            except Exception as exc:
                logger.exception(
                    "publish_progress_async: error publishing via app.state.pubsub: %s",
                    exc,
                )
                # fallback to other strategies

    # if we reach here, either no app.state.pubsub or it failed. Try redis async if configured
    if getattr(settings.celery, "use_redis", False) and getattr(
        settings.celery, "redis_url", None
    ):
        try:
            from app.elemental.tasks.services import PubSubRedis

            # instantiate a transient adapter and await publish
            rc = PubSubRedis(settings.celery.redis_url)
            await rc.publish(channel, body)
            return

        except Exception as exc:
            logger.exception(
                "publish_progress: error publishing async to Redis: %s", exc
            )

    # fallback: try in-memory async publish (if available)
    try:
        from app.elemental.tasks.services import PubSubInMemory

        pubsub = PubSubInMemory()
        await pubsub.publish(channel, payload)
        return

    except Exception as exc:
        logger.exception("publish_progress: fallback in-memory async falló: %s", exc)

    logger.warning("publish_progress: no se pudo publicar el progreso en %s", channel)
