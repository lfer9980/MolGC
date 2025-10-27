from fastapi import APIRouter

from .job import router as job_router

api_router = APIRouter(prefix="")

api_router.include_router(job_router)
