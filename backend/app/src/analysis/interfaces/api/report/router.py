from fastapi import APIRouter

from .v1 import router as v1_router

router = APIRouter(prefix="/report")

router.include_router(v1_router)
