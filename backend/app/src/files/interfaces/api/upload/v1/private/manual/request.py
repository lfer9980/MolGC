from app.elemental.common import ElementalSchema


class CreateRequest(ElementalSchema):
    # TODO: validate allowed algorithms
    family: str
    variant: str
    software: str
    functional: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "family": "FLUOROQUINOLES",
                    "variant": "ciprofloxacin",
                    "software": "CASTEP",
                    "functional": "LDA + OBS",
                }
            ]
        }
    }
