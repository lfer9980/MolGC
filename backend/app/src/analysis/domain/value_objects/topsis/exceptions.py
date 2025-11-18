from app.elemental.exceptions import ElementalBaseAppException


class InvalidTopsisID(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Id is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisReport(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Report is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisFunctional(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Functional is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisCriteria(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Criteria is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisDIdeal(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis DIdeal is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisDNotIdeal(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis DNotIdeal is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisCloseness(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Closeness is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)


class InvalidTopsisRanking(ElementalBaseAppException):
    def __init__(self, message: str = "Topsis Ranking is not valid", **kwargs):
        super().__init__(message, error_code="VALIDATION_ERROR", **kwargs)
