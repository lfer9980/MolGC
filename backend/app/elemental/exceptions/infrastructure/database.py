from app.elemental.exceptions.__elemental__.base import ElementalBaseAppException


class DatabaseError(ElementalBaseAppException):
    def __init__(self, message: str = "Database error", **kwargs):
        super().__init__(message, error_code="DATABASE_ERROR", **kwargs)
