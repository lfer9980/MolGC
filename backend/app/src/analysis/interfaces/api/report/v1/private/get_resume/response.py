from typing import Dict, List, Optional

from app.elemental.common import ElementalSchema
from app.src.analysis.domain.enums import ReportTypeEnum
from app.src.jobs.domain.enums import JobAnalysisEnum


class GetResumeResponse(ElementalSchema):
    title: str
    job_id: str
    reference: Optional[str] = None
    analysis_type: Optional[JobAnalysisEnum] = None
    size: int
    children: List[Dict]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "title": "Report General",
                    "reference": "Gaussian - MO6",
                    "analysis_type": JobAnalysisEnum.INDIVIDUAL,
                    "size": 2,
                    "children": [
                        {
                            "id": "<REPORT_ID>",
                            "type": ReportTypeEnum.MAE_GENERAL,
                            "title": "Report Title",
                            "size": 1,
                        },
                    ],
                },
                {
                    "title": "<FAMILY_NAME>",
                    "size": 2,
                    "children": [
                        {
                            "id": "<REPORT_ID>",
                            "type": ReportTypeEnum.MAE_FAMILY,
                            "title": "Report Title",
                            "size": 1,
                        },
                    ],
                },
            ]
        }
    }
