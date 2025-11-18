from .cleanup import beat_schedules

# from .cleanup import beat_schedules as cleanup_schedules
# from .other import beat_schedules as other_schedules
#
# beat_schedules = {**cleanup_schedules, **other_schedules}


# run with:
#  uv run celery -A app.infrastructure.celery.celery_app beat --loglevel=info
