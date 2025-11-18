# 🗄️ SQL Database Layer

This module provides the SQL database infrastructure layer for the application. It is built using async SQLAlchemy and follows best practices for scalable, maintainable, and testable database access. It includes database connection handling, model base classes, reusable mixins for common patterns, a generic repository for CRUD operations, and centralized configuration.

Designed to integrate smoothly with FastAPI, it simplifies database interactions while ensuring flexibility, consistency, and robust error management.

---

# 📁 Folder Structure

```bash
|-- sql/
|   |-- __init__.py
|   |-- connection.py
|   |-- settings.py
|
|-- models/
|   |-- __init__.py
|   |-- declarative.py
|   |-- mixins.py
|   |-- repository.py
|   |-- tables.py
```

---

## `connection.py`

Manages the lifecycle of the async SQLAlchemy engine and session factory.

- **init_database()**: Initializes the database engine.
- **close_database()**: Gracefully shuts down the engine on app shutdown.
- **DatabaseSession**: Context manager for async DB sessions.
- **get_session_dependency()**: FastAPI dependency to inject sessions.

---

## `settings.py`

Centralized configuration for DB connection settings.

- **DatabaseSettings** Stores the DB URL, connection pool size, and other parameters.
Can be configured via environment variables or `.env` file.

---

## 📁models/

### `declarative.py`

The base class that all SQLAlchemy models must inherit from.

---

### `mixins.py`

Reusable components for common ORM behaviors:

- **ElementalUUIDMixin**: Adds a UUID primary key.
- **ElementalTimestampMixin**: Adds `created_at` and `updated_at` fields.
- **ElementalSoftDeleteMixin**: Soft delete support via `deleted_at`.
- **ElementalAuditMixin**: Tracks `created_by` and `updated_by` fields.
- **ElementalReadOnlyMixin**: Prevents modification of read-only models.
- **ElementalModelMixin**: Utilities for model serialization, updates, and validation.

### `repository.py`

Generic async CRUD repository for models.
- Supports:
  - `_get_by_id()`
  - `_create()`
  - `_update()`
  - `_delete()`
  - `_get_all()` with pagination
- Handles common SQLAlchemy exceptions and wraps them into custom app-level errors.

### `tables.py`

Combines mixins into reusable base tables tailored for different use cases:

- Example: a table with UUID, timestamps, soft deletes, and audit tracking.

---

## 🚀 Usage Example

```python
from app.infrastructure.database.sql import DatabaseSession, ElementalRepository
from app.infrastructure.database.sql.models.declarative import DeclarativeBase
from app.infrastructure.database.sql.models.mixins import ElementalUUIDMixin, ElementalTimestampMixin

class MyModel(DeclarativeBase, ElementalUUIDMixin, ElementalTimestampMixin):
    __tablename__ = "my_model"
    # Define your columns here

# Using the repository
async with DatabaseSession() as session:
    repo = ElementalRepository(MyModel, session)
    instance = await repo._get_by_id(some_id)
```

---
