from app.elemental.common import ElementalSchema


class CreateResponse(ElementalSchema):
    saved_files: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "saved_files": "saved N files successfully",
                }
            ]
        }
    }
