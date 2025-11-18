from fastapi import APIRouter

from .private import router as private_router

router = APIRouter(prefix="/v1")

router.include_router(private_router)
