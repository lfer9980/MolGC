from app.elemental.exceptions import ElementalBaseAppException


class ReportNotCreatedError(ElementalBaseAppException):
    def __init__(
        self, message: str = "An error occurred during report registration", **kwargs
    ):
        super().__init__(message, error_code="REPORT_ERROR", **kwargs)
