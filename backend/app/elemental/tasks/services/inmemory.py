import asyncio
import json
from collections import defaultdict


class PubSubInMemory:
    """
    this is a temporal resource because Windows does not support Redis
    TODO: move this to RABBITMQ and delete this forever
    """

    def __init__(self):
        self.channels = defaultdict(list)
        self._lock = asyncio.Lock()

    async def subscribe(self, channel: str) -> asyncio.Queue:
        q = asyncio.Queue()
        async with self._lock:
            self.channels[channel].append(q)
        return q

    async def unsubscribe(self, channel: str, q: asyncio.Queue):
        async with self._lock:
            lst = self.channels.get(channel)
            if not lst:
                return
            try:
                lst.remove(q)
            except ValueError:
                pass
            if len(lst) == 0:
                del self.channels[channel]

    async def publish(self, channel: str, message):
        payload = message if isinstance(message, str) else json.dumps(message)
        async with self._lock:
            queues = list(self.channels.get(channel, []))
        for q in queues:
            await q.put(payload)

    def publish_sync(self, channel: str, message):
        """Publish from synchronous context. In memory, it is pushed directly
        to the queues.

        - NOTE: this only works if the publisher runs in the same process as FastAPI.
        - NOTE: this section is simple and assumes that in dev you are in the same process and there is no extreme concurrency.
        """
        payload = message if isinstance(message, str) else json.dumps(message)
        try:
            loop = asyncio.get_running_loop()
        except RuntimeError:
            loop = None

        # queues snapshots
        channels = list(self.channels.get(channel, []))
        for q in channels:
            try:
                if loop and loop.is_running():
                    # put without blocking
                    loop.call_soon_threadsafe(q.put_nowait, payload)
                else:
                    # if there is no loop running (rare in FastAPI), we try to create a temporary one
                    try:
                        q.put_nowait(payload)
                    except Exception as exc:
                        pass
            except Exception as exc:
                pass
