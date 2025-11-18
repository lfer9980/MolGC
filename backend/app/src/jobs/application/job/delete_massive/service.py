import os
import shutil
from pathlib import Path
from typing import List

from app import settings
from app.src.jobs.application.job.delete.exceptions import DeleteFileError
from app.src.jobs.domain.repositories.job_repository import JobRepository


class DeleteMassiveJobService:
    def __init__(self, repository: JobRepository):
        self.repository = repository
        self.storage_path = (
            (Path(__file__).resolve().parents[5] / settings.application.storage_path)
            if not os.getenv("STORAGE_PATH")
            else Path(os.getenv("STORAGE_PATH"))
        )

    async def execute(self, jobs_list: List[str]) -> int:
        if not jobs_list:
            return 0

        for job_id in jobs_list:
            job_folder = (self.storage_path / job_id).resolve()

            if not str(job_folder).startswith(str(self.storage_path.resolve())):
                raise DeleteFileError(f"Invalid job folder path: {job_folder}")

            if job_folder.exists():
                try:
                    shutil.rmtree(job_folder)

                except Exception as e:
                    raise DeleteFileError() from e

        return await self.repository.delete_massive(jobs_list)
