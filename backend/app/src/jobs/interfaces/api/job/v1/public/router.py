from fastapi import APIRouter

from .create import router as create_router

router = APIRouter(prefix="", tags=["Job"])

router.include_router(create_router)
