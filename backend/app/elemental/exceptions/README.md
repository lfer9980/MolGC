# ⚠️ Elemental Exceptions Module

This package provides a structured, extensible exception hierarchy for the application, enabling consistent error handling, logging, and API error responses across all layers (application, infrastructure, security, and use cases).

---

## 📁 Folder Structure

```bash
|-- __init__.py
|-- REDAME.md
|-- utils.py
|-- __elemental__/
|   |-- base.py
|-- application/
|   |-- application.py
|-- infrastructure/
|   |-- database.py
|   |-- external.py
|-- security/
|   |-- auth.py
|   |-- password.py
|   |-- permissions.py
|   |-- token.py
|-- usecase/
|   |-- validations.py
```

---

## 🏗️ Core Components

### `__elemental__/base.py`

Defines [`ElementalBaseAppException`](app/elemental/exceptions/__elemental__/base.py), the root exception for all custom errors. All other exceptions inherit from this class, providing a unified interface (`message`, `details`, `error_code`).

---

## 📦 Exception Categories

- **Application** (`application/application.py`):

  - [`ConfigurationError`]: Configuration issues.
  - [`RateLimitError`]: Rate limiting.

- **Infrastructure** (`infrastructure/`):

  - [`DatabaseError`]: Database-related errors.
  - [`ExternalServiceError`]: External API/service failures.

- **Security** (`security/`):

  - [`AuthenticationError`]: Authentication failures.
  - [`WeakPasswordError`]: Password strength issues.
  - [`PasswordMismatchError`]: Password confirmation mismatch.
  - [`UnauthorizedError`]: Unauthenticated access.
  - [`ForbiddenError`]: Insufficient permissions.
  - [`TokenExpiredError`]: Expired JWT.
  - [`InvalidTokenError`]: Malformed/invalid JWT.

- **Use Case** (`usecase/validations.py`):

  - [`ValidationError`]: Input validation errors.
  - [`NotFoundError`]: Resource not found.
  - [`DuplicateError`]: Duplicate resource.

---

## 🛠️ Utilities

  - `log_exception`: Structured exception logging.
  - `format_exception_response`: Formats exceptions for API responses.
  - `is_retriable_error`: Detects if an error can be retried.
  - `get_error_severity`: Classifies error severity.
  - [`ElementalExceptionHandler`]: Generic handler for logging and formatting exceptions.

---

## 🚀 Usage Example

```python
from app.elemental.exceptions import (
    ValidationError, DatabaseError, ElementalExceptionHandler
)

try:
    # some operation
    raise ValidationError("Invalid input")
except Exception as exc:
    handler = ElementalExceptionHandler()
    error_response = handler.handle(exc)
    print(error_response)
```

---

This module ensures all errors are handled in a consistent, maintainable, and extensible way throughout the application.
