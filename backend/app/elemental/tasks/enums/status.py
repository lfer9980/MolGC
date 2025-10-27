from app.elemental.common import ElementalStrEnum


class TaskStatusEnum(ElementalStrEnum):
    READY = "READY"
    RUNNING = "RUNNING"
    ERROR = "ERROR"
    DONE = "DONE"
