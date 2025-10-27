from typing import List

from app.elemental.common import ElementalSchema
from app.src.files.application.get_by_job.dto import FamilyGroupDTO


class CreateResponse(ElementalSchema):
    grouped_files: List[FamilyGroupDTO]
    software_variant: List[tuple[str, str]]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "grouped_files": [
                        {
                            "family": "family1",
                            "variants": [
                                {"variant": "varA", "count": 5},
                                {"variant": "varB", "count": 2},
                            ],
                        },
                        {
                            "family": "family2",
                            "variants": [{"variant": "varX", "count": 1}],
                        },
                    ],
                    "software_variant": [("functional", "variant")],
                }
            ]
        }
    }
