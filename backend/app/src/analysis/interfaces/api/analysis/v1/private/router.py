from app.gateways.web.auth.dependencies import jwt_bearer
from fastapi import APIRouter, Depends

from .create import router as create_router

router = APIRouter(
    prefix="",
    tags=["Analysis"],
    dependencies=[Depends(jwt_bearer)],
)

router.include_router(create_router)
