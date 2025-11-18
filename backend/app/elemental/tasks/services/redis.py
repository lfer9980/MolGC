"""
Redis Pubsub: single adapter for:
 - subscribe(channel) -> asyncio.Queue
 - unsubscribe(channel, queue)
 - publish(channel, message)      # async, for use from FastAPI/async code
 - publish_sync(channel, message) # sync helper (use from Celery tasks)
 - close()                        # cleanup

Implementation:
 - uses a single async client (redis.asyncio.Redis) and a single shared PubSub.
 - maintains channel -> set(asyncio.Queue) mapping
 - a background reader distributes messages to registered queues.
 - imports to redis are lazy (avoids ImportError if Redis is not used).
"""

from __future__ import annotations

import asyncio
import json
import logging
from typing import Any, Callable, Dict, Optional, Set

log = logging.getLogger(__name__)


def _ensure_str(v: Any) -> str:
    if isinstance(v, str):
        return v
    try:
        return v.decode()
    except Exception:
        return str(v)


class PubSubRedis:
    def __init__(self, redis_url: str, decode_responses: bool = True):
        """It does not import redis until it is necessary."""
        self.redis_url = redis_url
        self.decode_responses = decode_responses

        # lazy initialized clients
        self._aioredis = None
        self._sync_redis = None
        self._pubsub = None
        self._reader_task: Optional[asyncio.Task] = None

        # mapping: channel -> set(queues)
        self._queues_by_channel: Dict[str, Set[asyncio.Queue]] = {}
        self._subscribed_channels: Set[str] = set()

        # lock to synchronize subscriptions
        self._lock = asyncio.Lock()
        self._running = False

    def _import_sync_redis(self):
        """Lazy imports / init for sync methods."""
        if self._sync_redis is None:
            try:
                import redis as _redis
            except Exception as e:
                raise RuntimeError(
                    "'redis' package not available (sync). Install it to use Redis."
                ) from e

            self._sync_redis = _redis.Redis.from_url(
                self.redis_url, decode_responses=self.decode_responses
            )

    async def _import_async_redis(self):
        """Lazy imports / init for async methods."""
        if self._aioredis is None:
            try:
                import redis.asyncio as _aioredis
            except Exception as e:
                raise RuntimeError(
                    "The ‘redis.asyncio’ package is not available (async). Install it to use Redis."
                ) from e

            self._aioredis = _aioredis.from_url(
                self.redis_url, decode_responses=self.decode_responses
            )

    async def subscribe(self, channel: str) -> asyncio.Queue:
        """
        Public async API (WS use)
        - Subscribe to and return an asyncio.Queue that will receive messages (str).
        """
        channel = str(channel)
        await self._import_async_redis()

        async with self._lock:
            q = asyncio.Queue()
            channels = self._queues_by_channel.setdefault(channel, set())
            channels.add(q)

            # If you are not yet subscribed to Redis, subscribe to the shared pubsub.
            if channel not in self._subscribed_channels:
                # Initialize pubsub and reader if it is the first global subscription.
                if self._pubsub is None:
                    self._pubsub = self._aioredis.pubsub()

                await self._pubsub.subscribe(channel)
                self._subscribed_channels.add(channel)

                # start shared reader if no exists
                if not self._reader_task:
                    self._reader_task = asyncio.create_task(self._reader_loop())
                    self._running = True
            return q

    async def unsubscribe(self, channel: str, queue: asyncio.Queue):
        """Remove that queue from the channel.

        If there are no queues left for that channel -> unsubscribe in
        Redis.
        """
        channel = str(channel)
        async with self._lock:
            if channel not in self._queues_by_channel:
                return

            queues = self._queues_by_channel[channel]
            queues.discard(queue)

            if len(queues) == 0:
                # remove mapping and unsubscribe in redis
                self._queues_by_channel.pop(channel, None)
                if channel in self._subscribed_channels and self._pubsub is not None:
                    try:
                        await self._pubsub.unsubscribe(channel)
                    except Exception:
                        log.exception("Error on unsubscribing to channel %s", channel)
                    self._subscribed_channels.discard(channel)

                # if there are no subscribed channels, cancel reader
                if not self._subscribed_channels and self._reader_task:
                    self._reader_task.cancel()
                    self._reader_task = None
                    self._running = False

    async def publish(self, channel: str, message: Any):
        """Publish asynchronously (useful if you are in async code)."""
        await self._import_async_redis()

        payload = message if isinstance(message, str) else json.dumps(message)
        try:
            await self._aioredis.publish(channel, payload)
        except Exception:
            log.exception("Falló publish async en canal %s", channel)

    def publish_sync(self, channel: str, message: Any):
        """Sync publish helper (para Celery)

        Publish from a synchronous context (e.g., Celery task). Perform
        lazy-init of the sync client.
        """
        self._import_sync_redis()
        payload = message if isinstance(message, str) else json.dumps(message)

        try:
            self._sync_redis.publish(channel, payload)
        except Exception:
            log.exception("Error on publish sync to channel %s", channel)

    async def _reader_loop(self):
        """Reader loop (shares a pubsub) Reads messages from the shared pubsub
        and distributes them to the registered queues.

        This loop runs in the background until canceled.
        """
        if self._pubsub is None:
            return

        try:
            async for msg in self._pubsub.listen():
                # msg: dict type {'type': 'message', 'pattern': None, 'channel': 'ch', 'data': '...'}
                if msg is None:
                    continue
                if msg.get("type") != "message":
                    continue

                raw_channel = msg.get("channel")
                raw_data = msg.get("data")
                channel = _ensure_str(raw_channel)
                data = (
                    raw_data
                    if isinstance(raw_data, str)
                    else (
                        raw_data.decode()
                        if isinstance(raw_data, (bytes, bytearray))
                        else raw_data
                    )
                )

                # queues snapshots
                async with self._lock:
                    queues = list(self._queues_by_channel.get(channel, []))
                # dispatch (no blocking on lock)
                for q in queues:
                    try:
                        q.put_nowait(data)
                    except Exception as exc:
                        # if the queue is closed or does not accept, we ignore it
                        pass
        except asyncio.CancelledError:
            return
        except Exception as exc:
            log.exception("Error in PubSubRedis reader loop")
            return

    async def close(self):
        """Cleanup Closes pubsub and clients."""
        if self._reader_task:
            self._reader_task.cancel()

            try:
                await self._reader_task
            except Exception as exc:
                pass

            self._reader_task = None

        # unsubscribe to all channels
        if self._pubsub is not None:
            try:
                if self._subscribed_channels:
                    await self._pubsub.unsubscribe(*list(self._subscribed_channels))
            except Exception as exc:
                pass

            try:
                await self._pubsub.close()
            except Exception as exc:
                pass

            self._pubsub = None
            self._subscribed_channels.clear()

        # close async client
        if self._aioredis is not None:
            try:
                await self._aioredis.close()
                await self._aioredis.connection_pool.disconnect()
            except Exception as exc:
                pass
            self._aioredis = None

        # closes sync client (no await)
        if self._sync_redis is not None:
            try:
                self._sync_redis.close()
            except Exception as exc:
                pass
            self._sync_redis = None

    @staticmethod
    def publish_sync_url(
        redis_url: str, channel: str, message: Any, decode_responses: bool = True
    ):
        """Static Utils Shortcut to publish from Celery without having to
        instantiate an adapter in the Celery process.

        Creates a temporary sync client and publishes.
        """
        try:
            import redis as _redis
        except Exception as e:
            raise RuntimeError(
                "'redis' package not available (sync). Install it to use Redis."
            ) from e

        payload = message if isinstance(message, str) else json.dumps(message)
        client = _redis.Redis.from_url(redis_url, decode_responses=decode_responses)

        try:
            client.publish(channel, payload)
        finally:
            try:
                client.close()
            except Exception as exc:
                pass
