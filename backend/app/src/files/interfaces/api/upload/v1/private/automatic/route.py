from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.files.application.automatic.service import AutomaticFileService
from app.src.files.infrastructure.repository.file_repository import FileRepositorySQL
from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.service import UpdateJobService
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from .response import CreateResponse

router = APIRouter()


@router.post("/automatic", response_model=CreateResponse)
async def upload_automatic(
    zip_file: UploadFile = File(...),
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> CreateResponse:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # on automatic upload, user cannot upload more than one .zip file
    if job_entity.status != JobStatusEnum.UPLOAD_PENDING:
        raise HTTPException(
            status_code=422, detail="Files for this Job are already uploaded"
        )

    # # validate if upload type for this job is automatic
    if job_entity.upload_type != "automatic":
        raise HTTPException(
            status_code=422,
            detail=f"The selected upload type for this Job is automatic, try again",
        )

    # validate if is a zip file
    if not zip_file.filename.lower().endswith(".zip"):
        raise HTTPException(
            status_code=422, detail=f'The selected zip filename does not a ".zip"'
        )

    # service and repository definition
    repository = FileRepositorySQL(session)
    service = AutomaticFileService(repository)

    # execution
    saved_files = await service.execute(job_id, zip_file)

    # update Job status to UPLOAD_COMPLETED
    job_dto = UpdateJobDTO(
        **job_entity.model_dump(exclude={"status"}),
        status=JobStatusEnum.UPLOAD_COMPLETED,
    )

    await UpdateJobService.execute(session, job_id, job_dto)

    # returns response
    return CreateResponse(saved_files=f"{len(saved_files)} files successfully uploaded")
