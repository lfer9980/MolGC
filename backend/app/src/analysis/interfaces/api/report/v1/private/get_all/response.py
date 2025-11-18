from typing import Dict, List, Optional

from app.elemental.common import ElementalSchema
from app.src.jobs.domain.enums import JobAnalysisEnum


class GetAllResponse(ElementalSchema):
    job_id: str
    reference: Optional[str] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    size: int
    children: List[Dict]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "job_id": "<JOB_ID>",
                    "reference": "Gaussian - MO6",
                    "analysis_type": JobAnalysisEnum.INDIVIDUAL,
                    "size": 2,
                    "children": [],
                }
            ]
        }
    }
