from app.gateways.web.auth.dependencies import jwt_bearer
from fastapi import APIRouter, Depends

from .delete import router as delete_router
from .update import router as update_router
from .validate import router as validate_router

router = APIRouter(
    prefix="",
    tags=["Job"],
    dependencies=[Depends(jwt_bearer)],
)

router.include_router(update_router)
router.include_router(delete_router)
router.include_router(validate_router)
