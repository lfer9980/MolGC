from collections.abc import Callable
from typing import Optional, TypedDict, Union

from app.elemental.tasks.enums import TaskStatusEnum


class TaskPublishType(TypedDict, total=False):
    task_id: Optional[str]
    progress: Union[int, float]
    status: TaskStatusEnum
    message: str
    result: Optional[Union[int, float, dict]]


PublisherType = Callable[[TaskPublishType], None]
