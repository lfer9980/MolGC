from app import settings
from app.elemental.tasks.dependencies import PublisherCelery
from app.elemental.tasks.enums import TaskStatusEnum

# TODO: try to understand why the FUCK I need import this piece of shit on every declared task
from app.infrastructure.celery.celery_app import celery
from app.infrastructure.molgc.individual import IndividualAnalysis
from celery import shared_task

ReportsType = tuple[list[dict], list[dict], str, list[dict]]


@shared_task(bind=True)
def create_individual_task(
    self, job_id: str, job_path: str, reference: str
) -> ReportsType:
    # preprocessing
    task_id = self.request.id
    job_path_str = job_path
    channel = f"{settings.application.ws_channel_prefix}:{job_id}"

    # handler for inject partially channel
    publisher = PublisherCelery(channel=channel, task_id=task_id)

    # start with analysis
    try:
        analysis = IndividualAnalysis(
            path=job_path_str, publisher=publisher, reference=reference
        )

        analysis.load_data()
        analysis.extract_data()
        analysis.process_data()
        report_variant, report_family, report_general, topsis = analysis.report_data()

        publisher({"status": TaskStatusEnum.DONE, "message": "analysis finished"})
    except Exception as e:
        publisher(
            {
                "status": TaskStatusEnum.ERROR,
                "message": f"analysis failed with error: {e}",
            }
        )
        import traceback

        raise e

    # celery is not able to transport Pydantic models, we need to transform into a JSON
    s_report_variant = [item.model_dump() for item in report_variant]
    s_report_family = [item.model_dump() for item in report_family]

    return s_report_variant, s_report_family, report_general, topsis
