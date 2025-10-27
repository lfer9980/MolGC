from app.elemental.exceptions import ElementalBaseAppException


class IndividualAnalysisError(ElementalBaseAppException):
    def __init__(
        self,
        message: str = "Analysis Error occurred during Individual processing",
        **kwargs
    ):
        super().__init__(message, error_code="ANALYSIS_ERROR", **kwargs)
