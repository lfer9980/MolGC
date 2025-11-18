from datetime import datetime

from app.elemental.common import ElementalSchema


class CreateResponse(ElementalSchema):
    task_id: str
    channel: str
    created_at: datetime

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "task_id": "<TASK_ID>",
                    "channel": "<CHANNEL_ID>",
                    "created_at": "2023-01-01T00:00:00Z",
                }
            ]
        }
    }
