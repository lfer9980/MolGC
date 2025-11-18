from typing import Any, Dict, List

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.analysis.application.report.get_resume.service import (
    GetResumeReportService,
)
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .response import GetResumeResponse

router = APIRouter()


@router.get("/resume")
async def get_report_resume(
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> List[GetResumeResponse]:
    # validate if job exists
    job_id = payload["id"]
    job_entity = await ValidateJobService.execute(session, job_id)

    # validate if the report is ready
    if job_entity.status != JobStatusEnum.COMPLETED:
        raise HTTPException(
            status_code=422, detail="Report is not ready, try again later"
        )

    # service definition
    repository = ReportRepositorySQL(session)
    service = GetResumeReportService(repository)
    report_resume = await service.execute(job_entity)

    return [GetResumeResponse(**item.model_dump()) for item in report_resume]
