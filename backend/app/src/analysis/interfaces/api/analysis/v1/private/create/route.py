from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.analysis.application.analysis.create.dto import CreateAnalysisDTO
from app.src.analysis.application.analysis.create.service import CreateAnalysisService
from app.src.jobs.application.job.update.dto import UpdateJobDTO
from app.src.jobs.application.job.update.service import UpdateJobService
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .response import CreateResponse

router = APIRouter()


@router.post("/", response_model=CreateResponse)
async def create_analysis(
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> CreateResponse:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # validate if job is ready to start with analysis
    if job_entity.status != JobStatusEnum.READY:
        raise HTTPException(
            status_code=422,
            detail="Job is not ready for start with analysis or is making an analysis right now",
        )

    # service definition
    analysis_service = CreateAnalysisService()
    job_data = CreateAnalysisDTO(**job_entity.model_dump())
    analysis_dto = analysis_service.execute(job_data)

    # update job status to UPLOAD_COMPLETED
    job_dto = UpdateJobDTO(
        **job_entity.model_dump(exclude={"status"}), status=JobStatusEnum.ANALYSIS
    )

    await UpdateJobService.execute(session, job_id, job_dto)
    return CreateResponse(**analysis_dto.model_dump())
