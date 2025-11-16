from app.gateways.web.auth.dependencies import jwt_bearer
from fastapi import APIRouter, Depends

from .get_by_id import router as get_by_id_router
from .get_resume import router as get_resume_router
from .get_all import router as get_all_router

router = APIRouter(
    prefix="",
    tags=["Report"],
    dependencies=[Depends(jwt_bearer)],
)

router.include_router(get_by_id_router)
router.include_router(get_resume_router)
router.include_router(get_all_router)
