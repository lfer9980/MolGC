from typing import Any, Dict

from app.gateways.web.auth.dependencies import get_current_user_payload
from app.infrastructure.database.sql import get_session_dependency
from app.src.analysis.application.report.get_by_id.dto import GetByIDReportDTO
from app.src.analysis.application.report.get_by_id.service import GetByIDReportService
from app.src.analysis.domain.enums import ReportTypeEnum
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from app.src.jobs.application.job.validate.service import ValidateJobService
from app.src.jobs.domain.enums import JobStatusEnum
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .response import CreateResponse

router = APIRouter()


@router.get("/{report_type}/{report_id}", response_model=CreateResponse)
async def get_report_by_id(
    report_type: ReportTypeEnum,
    report_id: str,
    session: AsyncSession = Depends(get_session_dependency),
    payload: Dict[str, Any] = Depends(get_current_user_payload),
):
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
    service = GetByIDReportService(session, repository)

    # Create DTO
    data_dto = GetByIDReportDTO(
        job_id=job_id,
        report_id=report_id,
        type=report_type,
    )

    report_data = await service.execute(data_dto)
    return CreateResponse(**report_data.model_dump())
