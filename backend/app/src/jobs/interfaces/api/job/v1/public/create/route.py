from app.elemental.security import TokenService
from app.infrastructure.database.sql import get_session_dependency
from app.src.jobs.application.job.create.dto import CreateJobDTO
from app.src.jobs.application.job.create.service import CreateJobService
from app.src.jobs.infrastructure.repository.cleanup_repository import (
    CleanupRepositorySQL,
)
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .request import CreateRequest
from .response import CreateResponse

router = APIRouter()


@router.post("/", response_model=CreateResponse)
async def create_job(
    request: CreateRequest, session: AsyncSession = Depends(get_session_dependency)
) -> CreateResponse:
    # service and repository definition
    repository = JobRepositorySQL(session)
    cleanup_repository = CleanupRepositorySQL(session)
    service = CreateJobService(repository, cleanup_repository)

    # execution
    job_data = CreateJobDTO(**request.model_dump())
    job = await service.execute(new_data=job_data)

    # creates access token
    access_token = TokenService.create_token({"id": job.id})

    return CreateResponse(
        **job.model_dump(),
        access_token=access_token,
    )
