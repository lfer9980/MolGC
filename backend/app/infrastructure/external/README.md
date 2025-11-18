# 📧 External Email Infrastructure

This module provides a robust, extensible email infrastructure for the application, supporting SMTP email sending, template management, context validation, and attachment handling. It is designed for asynchronous operation and integrates with the application's logging and exception handling systems.

---

## 📁 Folder Structure

```bash
|-- __init__.py
|-- email/
|   |-- __init__.py
|   |-- connection.py
|   |-- send.py
|   |-- settings.py
|   |-- contexts/
|   |   |-- contexts.py
|   |-- core/
|   |   |-- exceptions.py
|   |   |-- service.py
|   |-- helpers/
|   |   |-- utils.py
```

---

## 🏗️ Main Components

### `email/`

#### `connection.py`

Core email functionality module containing all components for email operations, template management, and SMTP communication.

#### `connection.py`

Factory and helper functions for creating and managing the EmailService instance. Provides global singleton management and logger integration to ensure consistent email service availability across the application.

#### `send.py`

Asynchronous helper functions for safe email sending operations. Supports single emails, bulk sending, attachments, and multi-template scenarios with comprehensive error handling and logging.

#### `settings.py`

Pydantic-based configuration management for SMTP credentials, server settings, and operational parameters. Supports environment variable integration and validation of email service configuration.

### `contexts/`

#### `contexts.py`

Contains base classes and schemas for email template context validation, ensuring that template variables are properly structured and validated before rendering.

### `core/`

#### `core.py`

Houses the fundamental email service components including the main EmailService class and custom exception hierarchy for granular error handling across all email operations.

### `helpers/`

#### `helpers.py`

Utility functions for email operations including email address validation and cleaning, attachment validation, template registry creation, context sanitization, and email grouping for batch operations.

---

## ⚙️ Installation

Install required dependencies:

```bash
pip install aiosmtplib jinja2 pydantic
```

Import the module into your dependencies

```bash
from app.infrastructure.external import (
    create_email_service,
    safe_send_email,
    TemplateContext
)
```

---
## 🚀 Usage Example

```python
from app.infrastructure.external import (
    create_email_service,
    safe_send_email,
    TemplateContext
)
from app.infrastructure.external.email.settings import EmailSettings

# 1. Configure email settings (can use environment variables)
settings = EmailSettings(
    username="user",
    password="pass",
    server="smtp.example.com",
    sender="noreply@example.com"
)

# 2. Create template registry and service
templates_dir = Path("/path/to/templates")
templates_context = {...}  # See utils.create_email_template_registry
email_service = create_email_service(templates_dir, templates_context, settings)

# 3. Send an email
await safe_send_email(
    email_service=email_service,
    template_name="welcome",
    context={"username": "Alice"},
    recipients=["alice@example.com"]
)
```

---

## 🛠️ Key Features

- **Asynchronous SMTP**: Uses `aiosmtplib` for non-blocking email sending.
- **Template Rendering**: Jinja2-based HTML templates with context validation.
- **Attachment Support**: Validates and attaches files, with size/type checks.
- **Bulk & Multi-template Sending**: Helpers for batch operations.
- **Custom Exceptions**: Granular error handling for all email operations.
- **Logging**: Integrated with the application's logging system.
- **Context & Email Validation**: Utilities for safe, clean, and correct email operations.

---

## 🔗 Exposed API

You can import the following from this package:

- `TemplateContext`
- `create_email_service`
- `create_email_service_from_config`
- `init_global_email_service`
- `is_email_service_initialized`
-
