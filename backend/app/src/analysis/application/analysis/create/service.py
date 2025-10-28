import os
from pathlib import Path

from app import settings
from app.src.analysis.application.analysis.create.dto import (
    CreateAnalysisDTO,
    ResponseAnalysisDTO,
)
from app.src.analysis.application.analysis.create.exceptions import (
    IndividualAnalysisError,
)
from app.src.analysis.infrastructure.celery import (
    create_individual_task,
    create_report_task,
)
from app.src.jobs.domain.enums import JobAnalysisEnum
from celery import chain


class CreateAnalysisService:
    def __init__(self):
        self.task_id: str = ""
        self.channel = settings.application.ws_channel_prefix
        self.storage_path = (
            Path(__file__).resolve().parents[5] / settings.application.storage_path
        ) if not os.getenv("STORAGE_PATH") else Path(os.getenv("STORAGE_PATH"))

    def execute(self, job_data: CreateAnalysisDTO) -> ResponseAnalysisDTO:
        job_id = job_data.id
        job_path = str(self.storage_path / job_id)
        reference = job_data.reference

        try:
            if job_data.analysis_type == JobAnalysisEnum.INDIVIDUAL:
                # all task need to be invoked as a chain in order to share data properly
                sig = chain(
                    create_individual_task.s(job_id, job_path, reference),
                    create_report_task.s(job_id=job_id),
                )

                async_result = sig.apply_async()
                self.task_id = async_result.id
        except Exception as exc:
            raise IndividualAnalysisError(str(exc))

        channel = f"{self.channel}:{job_id}"

        return ResponseAnalysisDTO(task_id=self.task_id, channel=channel)
