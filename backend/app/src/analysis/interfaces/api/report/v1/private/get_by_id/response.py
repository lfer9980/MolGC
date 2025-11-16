from typing import Optional, Union

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.enums import ReportTypeEnum


class CreateResponse(ElementalSchema):
    id: str
    report_id: str
    family: Optional[str] = None
    variant: Optional[str] = None
    type: ReportTypeEnum
    data: Union[dict, list]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "<DATASET_ID>",
                    "report_id": "<REPORT_ID>",
                    "family": "<FAMILY_NAME>",
                    "variant": "<FAMILY_VARIANT>",
                    "type": "<REPORT_TYPE>",
                    "data": "<JSON_DATA>",
                }
            ]
        }
    }
