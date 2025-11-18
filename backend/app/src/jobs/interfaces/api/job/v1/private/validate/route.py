from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.jobs.application.job.validate.service import ValidateJobService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()


@router.get("/")
async def validate_job(
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> str:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    if job_entity is None:
        raise HTTPException(
            status_code=403,
            detail=f"Your job with id {job_id} was not found, or expired...",
        )

    return f"Your job with id {job_id} was valid."
