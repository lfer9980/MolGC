from datetime import datetime

from app.elemental.common import ElementalSchema


class CreateAnalysisDTO(ElementalSchema):
    id: str
    analysis_type: str
    reference: str


class ResponseAnalysisDTO(ElementalSchema):
    task_id: str
    channel: str
    created_at: datetime = datetime.now()
