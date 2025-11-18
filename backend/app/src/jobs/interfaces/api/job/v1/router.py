from fastapi import APIRouter

from .private import router as private_router
from .public import router as public_router

router = APIRouter(prefix="/v1")

router.include_router(public_router)
router.include_router(private_router)
