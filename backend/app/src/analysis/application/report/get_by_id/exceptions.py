from app.elemental.exceptions import ElementalBaseAppException


class ReportNotFound(ElementalBaseAppException):
    def __init__(self, message: str = "Report not found on database", **kwargs):
        super().__init__(message, error_code="NOT_FOUND", **kwargs)
