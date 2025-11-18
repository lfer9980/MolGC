# Tutorial de uso — Celery + WebSockets (progreso en tiempo real)

Este tutorial está pensado para usuarios que **ya tienen** una implementación de Celery + FastAPI + un pub/sub (Redis o
fallback in-memory) y quieren saber **cómo usarlo** en su día a día: arrancar workers, ejecutar tareas, monitorear
progreso en tiempo real por WebSockets y buenas prácticas operativas.

> Este documento NO entra en detalles de implementación del pub/sub o del código interno de las clases — está pensado
> para **consumidores** y operadores.

---

## Índice

1. Requisitos rápidos
2. Arrancar servicios (Redis, FastAPI, Celery worker)
3. Ejecutar tareas (desde Python, desde un endpoint HTTP)
4. Ver progreso en tiempo real (ejemplo cliente WebSocket)
5. Consultar estado / resultado de una tarea
6. Revocar, reintentar y manejo de errores
7. Monitorización y debugging (inspección, Flower, logs)
8. Buenas prácticas de uso
9. Preguntas frecuentes

---

## 1) Requisitos rápidos

* Redis accesible (o la opción in-memory para desarrollo si el worker y la app comparten proceso).
* Worker Celery configurado con el `broker` y, opcionalmente, `result_backend` si quieres consultar resultados.
* Una ruta que dispare la tarea o acceso al cliente Python para invocar `delay()` o `apply_async()`.
* Cliente WebSocket (navegador o script) que se suscriba a un canal nombrado por `user_id` y `task_id`.

---

## 2) Arrancar servicios

### Redis (dev — Docker)

Correr Redis rápidamente:

```bash
# docker
docker run -d --name redis -p 6379:6379 redis:7
```

O con docker-compose (archivo mínimo):

```yaml
services:
  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

### FastAPI (dev)

```bash
uvicorn app.main:app --reload --port 8000
```

### Worker Celery

Arrancar worker apuntando a la app de Celery:

```bash
celery -A app.infrastructure.celery.celery_app:celery worker --loglevel=info --concurrency=4
```

Si en Windows tienes problemas con procesos, usa `--pool=solo` para desarrollo.
Para elegir la cantidad de hilos donde Celery puede ejecutarse, usa `--concurrency=12`, si no pasas este flag, celery
tomara los disponibles.

---

## 3) Ejecutar tareas

### Desde Python (shell o script)

```python
from app.infrastructure.celery.tasks import task_sleep

# Ejecuta en background
result = task_sleep.delay(5)
print('task id:', result.id)

# Bloqueante: obtener resultado (usa timeout prudente)
print(result.get(timeout=10))
```

### Desde un endpoint HTTP (FastAPI)

```python
from fastapi import FastAPI
from app.infrastructure.celery.tasks import long_running_progress

app = FastAPI()


@app.post('/run-progress')
def run_progress(steps: int = 10, user_id: str | None = None):
    r = long_running_progress.delay(steps, user_id)
    return {"task_id": r.id}
```

Respuesta: `{ "task_id": "<uuid>" }` — el cliente debe usar ese id para suscribirse al canal WS o consultar el
resultado.

---

## 4) Ver progreso en tiempo real (cliente WebSocket)

**Requisito**: el backend publica eventos por canal, p. ej. `ws_channel:{user_id}:{task_id}`.

### Ejemplo minimal de cliente JS (navegador)

```javascript
// sustituye la URL por donde sirva tu endpoint WS
const ws = new WebSocket('ws://localhost:8000/ws');

ws.addEventListener('open', () => {
    // suscríbete al canal (dependiendo de tu protocolo) — ejemplo simple: enviar el canal al servidor
    const channel = 'ws_channel:123:your-task-id';
    ws.send(JSON.stringify({type: 'subscribe', channel}));
});

ws.addEventListener('message', (ev) => {
    try {
        const data = JSON.parse(ev.data);
        console.log('evento:', data);
        // esperar payload: { task_id, progress, status, message }
    } catch (e) {
        console.log('mensaje crudo:', ev.data);
    }
});

ws.addEventListener('close', () => console.log('conexión cerrada'));
```

> Nota: el protocolo exacto de suscripción depende de tu FastAPI WS endpoint. Lo típico es que el cliente envíe un
> mensaje indicando el canal/room y el servidor empiece a reenviar los mensajes del Pub/Sub.

---

## 5) Consultar estado / resultado de una tarea

Si configuraste `result_backend` (por ejemplo `redis://.../1`) puedes usar `AsyncResult` o el `result` devuelto por
`delay()`.

```python
from celery.result import AsyncResult

async_result = AsyncResult(task_id)
print('status', async_result.status)
print('result', async_result.result)  # None hasta que termine (o excepción si falló)
```

**Consejos**:

* Para APIs públicas no bloqueantes, devuelve inmediatamente el `task_id` y deja que el cliente consulte el resultado o
  reciba eventos via WS.
* Evita `get()` en endpoints HTTP sin un timeout corto; mejor devolver `202 Accepted` con `task_id`.

---

## 6) Revocar, reintentar y manejo de errores

### Revocar (cancela antes de que el worker empiece a ejecutar)

```python
from celery.task.control import revoke

revoke(task_id, terminate=True)  # terminate solo si el worker usa pool que lo soporta
```

### Reintentos dentro de la tarea

Usa `self.retry()` dentro de una tarea `bind=True`:

```python
@shared_task(bind=True, max_retries=3)
def my_task(self, ...):
    try:
        do_work()
    except Exception as exc:
        raise self.retry(exc=exc, countdown=10)
```

### Manejo de excepciones

* Emite un evento por WS al ocurrir una excepción para notificar al cliente.
* Guarda el error en un resultado (`result_backend`) o en logs para diagnóstico.

---

## 7) Monitorización y debugging

### Flower (dashboard para Celery)

Instala e inicia Flower para ver tareas en tiempo real:

```bash
pip install flower
celery -A app.infrastructure.celery.celery_app:celery flower --port=5555
```

Abre `http://localhost:5555`.

### Logs y métricas

* Exporta logs de Celery y del proceso que publica en Redis.
* Mide latencias e integra con Prometheus si necesitas alertas.

### Inspección desde consola

```bash
# ver queues y workers conectados
celery -A app.infrastructure.celery.celery_app:celery status

# inspect active tasks
celery -A app.infrastructure.celery.celery_app:celery -Q <queue-name> inspect active
```

---

## 8) Buenas prácticas de uso

* **No bloquear** los endpoints HTTP esperando por `result.get()` sin timeout.
* **Publicar eventos y guardar estado**: guarda el estado final de la tarea (y algunos checkpoints) en Redis o DB para
  que el cliente pueda consultarlo después de una desconexión.
* **Tamaño de mensajes**: publica solo lo necesario (porcentaje, mensajes cortos). Evita enviar payloads grandes por
  Pub/Sub.
* **Retries & idempotencia**: diseña tasks idempotentes o con mecanismos para evitar duplicados si la tarea se
  reintenta.
* **Seguridad**: valida que el usuario puede suscribirse al canal (ej.: usuario A no debería ver el progreso del usuario
  B).
* **Escalado**: si vas a tener muchos usuarios simultáneos, usa Redis con configuración para alto throughput; usa
  múltiples workers y balancea.

---

## 9) Preguntas frecuentes

**Q: Si el cliente se desconecta, pierdo el progreso?**
A: Con Pub/Sub sí, porque no hay persistencia. Guarda checkpoints en un backend si quieres que el cliente pueda
recuperar progreso.

**Q: Puedo usar la misma lógica sin Redis (solo in-memory)?**
A: Sí en desarrollo si el worker y la app comparten proceso, pero **no** es válido para producción ni para workers
separados.

**Q: Cómo puedo testear localmente sin Redis?**
A: Ejecuta FastAPI y Celery en el mismo proceso (solo para testing) y usa el adapter `InMemory` que expone los mismos
métodos. No lo uses en staging o prod.

---

## Rápida referencia de comandos

* Levantar Redis: `docker run -d --name redis -p 6379:6379 redis:7`
* Levantar FastAPI: `uvicorn app.main:app --reload --port 8000`
* Levantar Celery worker: `celery -A app.infrastructure.celery.celery_app:celery worker --loglevel=info`
* Revocar tarea: `python -c "from celery.task.control import revoke; revoke('<task_id>', terminate=True)"`
* Flower: `celery -A app.infrastructure.celery.celery_app:celery flower --port=5555`

---

Si querés, puedo ahora:

* Generar un ejemplo de cliente WebSocket completo (JS o Python) que se suscriba y muestre progreso en pantalla.
* Añadir una sección corta con ejemplos de buenas prácticas de almacenamiento de checkpoints (ej. formato de hash en
  Redis).
* O convertir esto en un `tutorial.md` separado listo para imprimir.

Decime cuál prefieres y lo agrego en el documento.
