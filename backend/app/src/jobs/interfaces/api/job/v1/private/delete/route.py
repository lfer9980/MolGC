from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.jobs.application.job.delete.service import DeleteJobService
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.delete("/")
async def delete_job(
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> str:
    # validate if job exists
    job_id = payload["id"]
    await ValidateJobService.execute(session, job_id)

    # repository declaration
    repository = JobRepositorySQL(session)

    # service execution
    service = DeleteJobService(repository)
    await service.execute(job_id)

    return f"Successfully deleted {job_id}"
