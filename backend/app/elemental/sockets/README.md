# WebSocketManager

## Descripción
`WebSocketManager` es un gestor de conexiones WebSocket que permite:

- Mantener múltiples conexiones simultáneas.
- Suscribirse a canales dinámicos (ej. por usuario + tarea).
- Reenviar mensajes de un pubsub central (Redis o InMemory) a los clientes conectados.
- Detectar finalización de tareas (`status: "done"`) y limpiar automáticamente las conexiones.
- Enviar mensajes personales o hacer broadcast a un canal.

Es ideal para integrarse con tareas asincrónicas como Celery, donde queremos informar progreso en tiempo real al cliente.

---

## Requisitos

- Python >= 3.9
- FastAPI
- `uvicorn` o equivalente
- Redis (opcional, si quieres usar pubsub real) o un PubSub in-memory para desarrollo.
- `asyncio` (builtin)

---

## Inicialización en FastAPI (Lifespan)

```python
from fastapi import FastAPI
from app.gateways.socket.websocket_manager import WebSocketManager
from app.gateways.socket.redis_pubsub import PubSubRedis
import logging

logger = logging.getLogger(__name__)
app = FastAPI()

@app.on_event("startup")
async def on_startup():
    # Inicializa pubsub central (Redis o in-memory)
    app.state.pubsub = PubSubRedis(redis_url="redis://localhost:6379/0")  # o tu implementación in-memory
    # Inicializa WebSocketManager con pubsub
    app.state.ws_manager = WebSocketManager(app.state.pubsub)
    logger.info("WebSocketManager inicializado")

@app.on_event("shutdown")
async def on_shutdown():
    # Cerrar pubsub si tiene close
    if hasattr(app.state.pubsub, "close"):
        await app.state.pubsub.close()
    # Cancelar listeners del WebSocketManager
    if hasattr(app.state.ws_manager, "close"):
        await app.state.ws_manager.close()
