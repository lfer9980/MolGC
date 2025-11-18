from fastapi import APIRouter

from .private import router as private_router
from .ws import router as ws_router

router = APIRouter(prefix="/v1")

router.include_router(private_router)
router.include_router(ws_router)
