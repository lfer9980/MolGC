from app.elemental.tasks.types import TaskPublishType

from .utils import publish_progress_sync


class PublisherCelery:
    """
    General utility for share Publisher across a process via publish_progress_sync
    - since there is not an "elegant" way to share channel and task_id, this class helps you to upload your
    message to celery on a pythonist way.

    channel: receive the current channel for listen the celery task
    task_id: celery task id, util for identify this id on all your subprocesses
    """

    def __init__(self, channel: str, task_id: str):
        self.channel = channel
        self.task_id = task_id

    def __call__(self, payload: TaskPublishType) -> None:
        payload = {k: self._sanitize(v) for k, v in payload.items()}
        payload["task_id"] = self.task_id

        publish_progress_sync(self.channel, payload)

    @classmethod
    def _sanitize(cls, v):
        from pathlib import Path

        if isinstance(v, Path):
            return str(v)
        return v
