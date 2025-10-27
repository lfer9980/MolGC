import asyncio

from app import settings
from app.elemental.exceptions.security.token import InvalidTokenError
from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.jobs.application.job.validate.service import ValidateJobService
from fastapi import APIRouter, Depends, WebSocket
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.websockets import WebSocketDisconnect

router = APIRouter(
    prefix="",
    tags=["Analysis"],
)


@router.get("/ws-info", include_in_schema=True)
def ws_info():
    """📡 **WebSocket Endpoint**

    - URL: `/api/analysis/v1/ws`
    - Method: `WebSocket`
    - Auth: `?token=<JWT>` o header `Authorization: Bearer <token>`
    - Usage:
    """
    return {"detail": "Este endpoint solo describe el uso del WebSocket"}


@router.websocket("/ws")
async def ws_analysis(
    websocket: WebSocket,
    session: AsyncSession = Depends(get_session_dependency),
):
    # Auth
    auth_header = websocket.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        await websocket.close(code=1008)
        return

    token = auth_header.split(" ")[1]
    try:
        payload = await get_current_user_payload(token)
    except InvalidTokenError:
        await websocket.close(code=1008)
        return

    # Validate the job
    job_id = payload["id"]
    await ValidateJobService.execute(session, job_id)

    # websocket logic
    ws_manager = websocket.app.state.ws_manager
    channel = f"{settings.application.ws_channel_prefix}:{job_id}"

    await ws_manager.connect(websocket)
    await ws_manager.subscribe(websocket, channel)

    try:
        while True:
            try:
                # in case that client sends something...
                message = await asyncio.wait_for(websocket.receive_text(), timeout=1.0)

            except asyncio.TimeoutError:
                continue

            except WebSocketDisconnect:
                break

    except Exception as e:
        print(f"Error in websocket: {e}")

    finally:
        await ws_manager.disconnect(websocket)
