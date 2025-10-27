import json
from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.files.application.manual.dto import ClassificationFileDTO
from app.src.files.application.manual.service import ManualFileService
from app.src.files.infrastructure.repository.file_repository import FileRepositorySQL
from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.service import UpdateJobService
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from .request import CreateRequest
from .response import CreateResponse

router = APIRouter()


@router.post("/manual", response_model=CreateResponse)
async def upload_manual(
    file: UploadFile = File(...),
    classification: str = Form(...),
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> CreateResponse:
    # validate if Job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # validate if upload type for this Job is manual or automatic
    if job_entity.upload_type != "manual":
        raise HTTPException(
            status_code=422,
            detail=f"The selected upload type for this job is manual, try again",
        )

    # parse & validate classification data with Pydantic
    try:
        classification = json.loads(classification)
        create_request = CreateRequest(**classification)
    except (json.JSONDecodeError, ValueError) as e:
        raise HTTPException(
            status_code=422, detail=f"Error during Settings Extraction: {str(e)}"
        )

    # service and repository definition
    repository = FileRepositorySQL(session)
    service = ManualFileService(repository)

    # execution
    classification_dto = ClassificationFileDTO(**create_request.model_dump())
    file_entity = await service.execute(file, classification_dto, job_id)

    # update job status to UPLOAD_COMPLETED
    job_dto = UpdateJobDTO(
        **job_entity.model_dump(exclude={"status"}),
        status=JobStatusEnum.UPLOAD_COMPLETED,
    )

    await UpdateJobService.execute(session, job_id, job_dto)

    # returns response
    return CreateResponse(**file_entity.model_dump())
