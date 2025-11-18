from datetime import timedelta

from app.infrastructure.celery.celery_app import get_or_create_event_loop
from app.infrastructure.database import DatabaseSession
from app.src.jobs.application.cleanup.get_due.service import GetDueCleanupService
from app.src.jobs.application.job.delete_massive.service import DeleteMassiveJobService
from app.src.jobs.infrastructure.repository.cleanup_repository import (
    CleanupRepositorySQL,
)
from app.src.jobs.infrastructure.repository.job_repository import JobRepositorySQL
from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(bind=True)
def run_cleanup_jobs(self):
    logger.info("Starting cleanup jobs")

    loop = get_or_create_event_loop()
    loop.run_until_complete(_run_cleanup_async())

    logger.info("Cleanup jobs completed")


async def _run_cleanup_async():
    async with DatabaseSession() as session:
        # service cleanup declaration
        repository_cleanup = CleanupRepositorySQL(session)
        service_cleanup = GetDueCleanupService(repository_cleanup)

        # get all pending cleanup jobs
        due_cleanup_jobs = await service_cleanup.execute()

        if len(due_cleanup_jobs) == 0:
            return logger.info("No jobs to clean right now!")

        # service job declaration
        repository_job = JobRepositorySQL(session)
        service_job = DeleteMassiveJobService(repository_job)

        # delete all jobs
        delete_jobs_list = [job.job_id for job in due_cleanup_jobs]
        deleted = await service_job.execute(delete_jobs_list)

        return logger.info(f"Deleted {deleted} items")


beat_schedules = {
    "cleanup-expired-jobs": {
        "task": "app.src.jobs.infrastructure.schedules.cleanup.run_cleanup_jobs",
        "schedule": timedelta(hours=24),
    },
}
