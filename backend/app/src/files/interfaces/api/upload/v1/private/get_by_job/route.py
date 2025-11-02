from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database import get_session_dependency
from app.src.files.application.get_by_job.service import GetByJobFileService
from app.src.files.infrastructure.repository.file_repository import FileRepositorySQL
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .response import CreateResponse

router = APIRouter()


@router.get("/", response_model=CreateResponse)
async def get_by_job(
        session: AsyncSession = Depends(get_session_dependency),
        payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> CreateResponse:
    # validate if session exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    if job_entity.status == JobStatusEnum.UPLOAD_PENDING:
        raise HTTPException(
            status_code=404,
            detail=f"The Job: {job_id} does not have any files uploaded",
        )

    # service and repository definition
    repository = FileRepositorySQL(session)
    service = GetByJobFileService(repository)

    files_resume, references = await service.execute(job_id)

    return CreateResponse(data=files_resume, references=references)
