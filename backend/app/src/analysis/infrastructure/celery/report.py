import asyncio

# TODO: try to understand why the FUCK I need import this piece of shit on every declared task
from app.infrastructure.celery.celery_app import celery
from app.infrastructure.database import DatabaseSession
from app.src.analysis.infrastructure.celery.subtasks import (
    save_mae_family_data,
    save_mae_general_data,
    save_mae_variant_data,
    save_rmsd_variant_data,
    save_structure_data,
    save_topsis_data,
    update_job_status,
)
from app.src.analysis.infrastructure.repository.report_repository import (
    ReportRepositorySQL,
)
from celery import shared_task

ReportsType = tuple[list[dict], list[dict], str, list[dict]]


@shared_task(bind=True)
def create_report_task(self, new_data: ReportsType, job_id: str):
    async def run_task():
        async with DatabaseSession() as session:
            # services declaration
            repository_report = ReportRepositorySQL(session)

            # save mae variant data
            await save_mae_variant_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                mae_variant_data=new_data[0],
            )

            # save RMSD data
            await save_rmsd_variant_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                rmsd_data=new_data[0],
            )

            # save structure data
            await save_structure_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                structure_data=new_data[0],
            )

            # save mae family report
            await save_mae_family_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                mae_data=new_data[1],
            )

            # save mae general report
            await save_mae_general_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                mae_data=new_data[2],
            )

            # save topsis data
            await save_topsis_data(
                session=session,
                repository_report=repository_report,
                job_id=job_id,
                topsis_data=new_data[3],
            )

            # update job service to done
            await update_job_status(
                session=session,
                job_id=job_id,
            )

    asyncio.run(run_task())
