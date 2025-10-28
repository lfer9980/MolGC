import os
import shutil
from pathlib import Path

from app import settings
from app.src.jobs.application.job.delete.exceptions import DeleteFileError
from app.src.jobs.domain.entities.job_entity import JobEntity
from app.src.jobs.domain.repositories.job_repository import JobRepository


class DeleteJobService:
    def __init__(self, repository: JobRepository):
        self.repository = repository
        self.storage_path = (
            Path(__file__).resolve().parents[5] / settings.application.storage_path
        ) if not os.getenv("STORAGE_PATH") else Path(os.getenv("STORAGE_PATH"))

    async def execute(self, job_id: str) -> JobEntity:
        job_folder = (self.storage_path / job_id).resolve()

        if job_folder.exists() and not str(job_folder).startswith(
            str(self.storage_path.resolve())
        ):
            raise DeleteFileError("Invalid job folder path")

        if job_folder.exists():
            try:
                shutil.rmtree(job_folder)
            except Exception as e:
                raise DeleteFileError() from e

        return await self.repository.delete(job_id)
