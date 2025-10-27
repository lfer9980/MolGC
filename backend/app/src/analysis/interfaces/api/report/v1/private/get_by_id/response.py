from typing import Optional, Union

from app.elemental.common import ElementalSchema


class CreateResponse(ElementalSchema):
    id: str
    report_id: str
    family: Optional[str] = None
    variant: Optional[str] = None
    data: Union[dict, list]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "<DATASET_ID>",
                    "report_id": "<REPORT_ID>",
                    "family": "<FAMILY_NAME>",
                    "variant": "<FAMILY_VARIANT>",
                    "data": "<JSON_DATA>",
                }
            ]
        }
    }
