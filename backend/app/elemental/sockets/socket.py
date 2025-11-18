"""
WebSocketManager:
- maintains connections
- manages channel <-> connection subscriptions
- starts a listener per channel that reads from the pubsub (queue) and forwards to subscribed websockets
- exposes publish(...) so that tasks can publish progress (delegating to pubsub)
"""

import asyncio
import json
from typing import Any, Dict, Set

from app.elemental.logging import get_logger
from fastapi import WebSocket

logger = get_logger("WebSocketManager")


class WebSocketManager:
    def __init__(self, pubsub):
        """
        pubsub: object with async methods:
            - subscribe(channel) -> asyncio.Queue
            - unsubscribe(channel, queue)
            - publish(channel, message) -> awaitable
        """
        self.pubsub = pubsub

        # conn_id -> WebSocket
        self._connections: Dict[int, WebSocket] = {}

        # conn_id -> set(channel)
        self._channels_by_conn: Dict[int, Set[str]] = {}

        # channel -> set(conn_id)
        self._conns_by_channel: Dict[str, Set[int]] = {}

        # channel -> dict { "queue": asyncio.Queue, "task": asyncio.Task }
        self._listeners: Dict[str, Dict[str, Any]] = {}

        # protect modifications
        self._lock = asyncio.Lock()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()

        cid = id(websocket)
        async with self._lock:
            self._connections[cid] = websocket
            self._channels_by_conn.setdefault(cid, set())

        return cid

    async def disconnect(self, websocket: WebSocket):
        cid = id(websocket)
        async with self._lock:
            channels = self._channels_by_conn.pop(cid, set())
            self._connections.pop(cid, None)

        # unsubscribe from all channels (this may stop listeners if no conns left)
        for channel in list(channels):
            await self.unsubscribe(websocket, channel)

        try:
            await websocket.close(code=1000, reason="Connection closed")
        except Exception:
            pass

    async def subscribe(self, websocket: WebSocket, channel: str):
        """Subscribe the connection to the channel.

        If it is the first connection for that channel, create a
        listener that reads from the pubsub.
        """
        cid = id(websocket)
        async with self._lock:
            # add connection if missing
            if cid not in self._connections:
                self._connections[cid] = websocket
                self._channels_by_conn.setdefault(cid, set())

            self._channels_by_conn[cid].add(channel)
            self._conns_by_channel.setdefault(channel, set()).add(cid)

            # if there is no listener, create one
            if channel not in self._listeners:
                queue = await self.pubsub.subscribe(channel)
                task = asyncio.create_task(self._channel_reader(channel, queue))
                self._listeners[channel] = {"queue": queue, "task": task}

    async def unsubscribe(self, websocket: WebSocket, channel: str):
        cid = id(websocket)
        remove_listener = False
        async with self._lock:
            # remove conn from channel mapping
            conns = self._conns_by_channel.get(channel)
            if conns:
                conns.discard(cid)
                if len(conns) == 0:
                    # no more subscribers -> remove channel mapping and mark to clean up
                    self._conns_by_channel.pop(channel, None)
                    remove_listener = True

            # remove channel from conn mapping
            channel_set = self._channels_by_conn.get(cid)
            if channel_set:
                channel_set.discard(channel)
                if len(channel_set) == 0:
                    self._channels_by_conn.pop(cid, None)

        if remove_listener:
            # stop the listener and unsubscribe from pubsub
            listener = self._listeners.pop(channel, None)
            if listener:
                task = listener.get("task")
                queue = listener.get("queue")
                # cancel task
                if task:
                    task.cancel()

                # ask pubsub to unsubscribe (awaitable)
                try:
                    await self.pubsub.unsubscribe(channel, queue)
                except Exception as exc:
                    # best-effort
                    pass

    async def _channel_reader(self, channel: str, queue: asyncio.Queue):
        """Reads messages from `queue` (asyncio.Queue) and forwards them to all
        connections.

        linked to `channel`. If it detects {“status”: “DONE”}:
            - sends a final message,
            - disconnects the websockets from the channel,
            - unsubscribes from the pubsub for this queue and terminates the reader.
        """
        try:
            while True:
                # Wait for the next message (async blocker)
                message = await queue.get()
                if message is None:
                    continue

                # Normalize to text (JSON string or str)
                text = message if isinstance(message, str) else json.dumps(message)

                try:
                    data_obj = json.loads(text)
                except Exception:
                    data_obj = None

                # We take snapshots of connections for this channel (to avoid long locks).
                async with self._lock:
                    conn_ids = list(self._conns_by_channel.get(channel, []))
                    sockets = [self._connections.get(cid) for cid in conn_ids]

                # Send in parallel with _safe_send
                send_tasks = [
                    self._safe_send(ws, text) for ws in sockets if ws is not None
                ]
                if send_tasks:
                    # return_exceptions=True so that everything does not fail if one tasks fails
                    await asyncio.gather(*send_tasks, return_exceptions=True)

                # If we detect that the task has finished, we force closure and cleanup.
                if isinstance(data_obj, dict) and data_obj.get("status") == "DONE":
                    async with self._lock:
                        conn_ids = list(self._conns_by_channel.get(channel, []))

                    for cid in conn_ids:
                        ws = self._connections.get(cid)
                        if not ws:
                            continue

                        try:
                            await self._safe_send(
                                ws, json.dumps({"type": "final", "payload": data_obj})
                            )
                        except Exception:
                            pass

                        try:
                            await self.disconnect(ws)
                        except Exception:
                            logger.exception(
                                "Error disconnecting websocket for channel %s, cid %s",
                                channel,
                                cid,
                            )

                    try:
                        await self.pubsub.unsubscribe(channel, queue)
                    except Exception:
                        logger.exception(
                            "Error unsubscribing channel %s in _channel_reader", channel
                        )

                    break

        except asyncio.CancelledError:
            #  If the reader task was canceled externally, we attempt cleanup and exit.
            try:
                await self.pubsub.unsubscribe(channel, queue)
            except Exception:
                pass
            return

        except Exception as exc:
            logger.exception(
                "Unhandled error in _channel_reader for %s: %s", channel, exc
            )
            try:
                await self.pubsub.unsubscribe(channel, queue)
            except Exception:
                pass
            return

    async def _safe_send(self, websocket: WebSocket, text: str):
        try:
            await websocket.send_text(text)
        except Exception:
            # If the transfer fails, disconnect the tasks cleanly.
            try:
                await self.disconnect(websocket)
            except Exception:
                pass

    async def send_personal_message(self, websocket: WebSocket, payload: Any):
        """Send Personal Message via specific Channel."""
        text = payload if isinstance(payload, str) else json.dumps(payload)
        await self._safe_send(websocket, text)

    async def broadcast(self, channel: str, payload: Any):
        """Publish via pubsub (so that listeners and other instances receive
        it)."""
        await self.pubsub.publish(channel, payload)

    # inspection helpers (useful for debugging)
    async def active_connections(self) -> int:
        async with self._lock:
            return len(self._connections)

    async def channels_for_conn(self, websocket: WebSocket):
        async with self._lock:
            return set(self._channels_by_conn.get(id(websocket), set()))
