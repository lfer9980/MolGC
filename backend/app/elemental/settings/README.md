# ⚙️  Setting Module

This module provides a flexible, enviroment-aware configuration system bult on Pydantic Settings. It supports multiple application types (CLI and Web), hierarchical configuration loading, and seamless integration with enviroment variables and TOML confoguratiion files.

---

## 📁 Folder Structure

```bash
|-- core/
|   |-- cli.py         # CLI application configuration schema
|   |-- web.py         # Web application configuration schema
|   |-- __init__.py
|
|-- elemental.py       # Main settings orchestrator and configuration loader
|-- README.md
|-- __init__.py
```

---

## 📁 core/

### 🖥️ `cli.py`

Defines `CliAppSettings`, a configuration schema optimized for command-line applications.

---

```python
class CliAppSettings(BaseSettings):
    app_env: str = "development"
    app_name: str = "My App"
    debug: bool = False
    secret_key: str = 'some_secret_key'
    app_version: str = '0.0.0'
```

Core CLI settings include:

- **app_env**: Application environment (development, production, testing)
- **app_name**: Human-readable application name
- **debug**: Debug mode toggle for enhanced logging and error reporting
- **secret_key**: Cryptographic key for security operations
- **app_version**: Semantic version string for the application

This also includes `Config` class with `extra = 'ignore'` to silently discard unknown configuration keys.

---

### 🌐 `core.py`

Defines `WebAppSettings`, extending CLI settings with web server and CORS configuration

```python
class WebAppSettings(BaseSettings):
    # Inherits all CLI settings
    app_env: str = "development"
    app_name: str = "My App"
    # ... other base settings

    # Web-specific configuration
    host: str = 'localhost'
    port: int = 8000

    # CORS configuration
    cors_origins: list[str] = ['*']
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ['*']
    cors_allow_headers: list[str] = ['*']
    max_age: int = 3600
```

Web-specific features include server host and port configuration, fine-grained CORS control, security settings for credentials and request methods, and caching optimization using *max-age* headers.

---

## 🎯 `elemental.py`

The main configuration orchestrator that dynamically selects application type and manages configuration sources.

---

```python
class ElementalSettings(PydanticBaseSettings):
    application: WebAppSettings | CliAppSettings
```

The module employs intelligent configuration source prioritiization such as :

- **Environment Detection**: Checks elementalback_application__app_env environment variable
- **Source Hierarchy**: When environment is detected:
        Initialization settings (programmatic)
        Environment variables
        .env files
        File-based secrets
- **Fallback Strategy**: When no environment specified:
        Loads from settings.dev.toml configuration file

---

## How to start

Configuration sources (priority order):
        Environment variables (elementalback_application__*)
        TOML files (settings.dev.toml)
        Default values

```python
from settings.elemental import ElementalSettings

# Automatic configuration loading
settings = ElementalSettings()

# Web or CLI detection
if hasattr(settings.application, 'host'):
    print(f"Web server: {settings.application.host}:{settings.application.port}")
else:
    print(f"CLI app: {settings.application.app_name}")
```

---
