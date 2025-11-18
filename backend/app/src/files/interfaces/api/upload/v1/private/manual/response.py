from app.elemental.common import ElementalSchema


class ManualResponse(ElementalSchema):
    filename: str
    checksum: str
    size: int

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "filename": "<FILENAME>",
                    "checksum": "<CHECKSUM>",
                    "size": "<SIZE>",
                }
            ]
        }
    }
