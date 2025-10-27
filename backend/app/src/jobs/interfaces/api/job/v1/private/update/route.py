from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.service import UpdateJobService
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .request import CreateRequest
from .response import CreateResponse

router = APIRouter()


@router.put("/", response_model=CreateResponse)
async def update_job(
    request: CreateRequest,
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> CreateResponse:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # validate if the job is not on upload state
    if job_entity.status == JobStatusEnum.UPLOAD_PENDING and request.reference:
        raise HTTPException(
            status_code=422,
            detail=f"the job: {job_id} cannot be updated on reference: {request.reference}, "
            f"because it does not have any file uploaded",
        )

    # change state automatically to READY if request.reference
    if request.reference and job_entity.status == JobStatusEnum.UPLOAD_COMPLETED:
        request.status = JobStatusEnum.READY

    # execution
    job_dto = UpdateJobDTO(**request.model_dump(exclude_none=True))
    job = await UpdateJobService.execute(session, job_id, job_dto)

    return CreateResponse(**job.model_dump())
