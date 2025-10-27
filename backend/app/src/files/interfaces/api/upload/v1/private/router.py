from app.gateways.web.auth.dependencies import jwt_bearer
from fastapi import APIRouter, Depends

from .automatic import router as automatic_router
from .get_by_job import router as get_by_job_router
from .manual import router as manual_router

router = APIRouter(prefix="", tags=["Upload"], dependencies=[Depends(jwt_bearer)])

router.include_router(manual_router)
router.include_router(get_by_job_router)
router.include_router(automatic_router)
