from fastapi import APIRouter

from .analysis import router as analysis_router
from .report import router as report_router

api_router = APIRouter(prefix="")

api_router.include_router(analysis_router)
api_router.include_router(report_router)
