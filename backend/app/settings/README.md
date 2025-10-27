# ⚙️ Application Settings Module

This package centralizes and manages all configuration settings for the application, including JWT authentication, database connections, and environment-specific options. It provides a structured, extensible, and type-safe way to access settings throughout the codebase.

---

## 📁 Folder Structure

```bash
|-- settings/
|   |-- __init__.py
|   |-- application.py
|   |-- get_session.py
|   |-- README.md
|
|-- components/
|   |-- jwt.py
```

---

## 🏗️ Main Components

### `application.py`
- Defines [`ApplicationSettings`], the main settings class for the application.
- Aggregates sub-settings such as JWT (`JWTSettings`) and database (`DatabaseSettings`).

### `components/jwt.py`
- Defines [`JWTSettings`], which manages JWT authentication configuration (algorithm, token expiration, etc.).

### `get_settings.py`
- Provides the `get_settings()` function to dynamically load the correct settings depending on the runtime context (web server or CLI).
- Uses either `WebAppSettings` or `CliAppSettings` from the elemental settings module.

### `__init__.py`
- Exposes the main `settings` object and `ApplicationSettings` class for easy import throughout the application.

---

## 🚀 Usage Example

```python
from app.settings import settings

# Access JWT settings
jwt_algorithm = settings.application.jwt.algorithm
access_token_expiry = settings.application.jwt.access_token_expire_hours

# Access database settings
db_url = settings.application.database.url
```

---

## 🛠️ Key Features

- **Centralized Configuration**: All settings are managed in one place for consistency and maintainability.
- **Environment Awareness**: Automatically loads the appropriate settings for web or CLI environments.
- **Extensible**: Easily add new configuration sections (e.g., email, cache) by extending `ApplicationSettings`.
- **Type-Safe**: Uses Pydantic models for validation and IDE autocompletion.

---

## 🔗 Exposed API

- `settings`: The main settings object, ready to use.
- `ApplicationSettings`: The main settings class for extension or direct use.

---

This module ensures your application's configuration is robust, maintainable, and easy to use across all components.
