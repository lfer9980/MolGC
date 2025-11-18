from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.analysis.application.report.get_all_by_job.service import (
    GetAllByJobReportService,
)
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .response import GetAllResponse

router = APIRouter()


@router.get("/all", response_model=GetAllResponse)
async def get_all_report(
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> GetAllResponse:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # validate if the report is ready
    if job_entity.status != JobStatusEnum.COMPLETED:
        raise HTTPException(
            status_code=422,
            detail="The job was not completed successfully Report generation yet.",
        )

    # service job definition
    repository = ReportRepositorySQL(session)
    service = GetAllByJobReportService(session, repository)

    reports_records = await service.execute(job_entity)

    return GetAllResponse(**reports_records.model_dump())
