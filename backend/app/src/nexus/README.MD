# Nexus Module
This package serves as a centralized hub for shared domain definitions across projects, including common enumerations, constants, and model relationship configurations.

---

## 📁 Folder Structure

```bash
|-- definitions/
|   |-- constants/
|   |   |-- __init__.py
|   |
|   |-- enums/
|   |   |-- __init__.py
|   |
|   |-- __init__.py
|
|-- models_registry.py
|-- relations_registry.py
|-- __init__.py
```

---

## 🔢 `definitions/`

### `constants/`

Defines immutable constants used throughout the application.

Example:

```python
# nexus/definitions/constants/logger_attemps.py

MAX_LOGIN_ATTEMPTS = 5
DEFAULT_TIMEOUT_SECONDS = 30
```

### `enums/`

Defines enumerations representing fixed sets of related constants.

Using Example:

```python
# nexus/definitions/enums/roles.py

from app.elemental.common.enums.text import ElementalStrEnum

class UserRole(ElementalStrEnum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"

```

## 📄 `models_registry.py`

Centralizes importing and exporting of all domain models.

Using Example:

```python
# nexus/models_registry.py

from app.src.tasks.infrastructure.models.sql.task import TaskModelSQL
from app.src.users.infrastructure.models.sql.user import UserModelSQL

__all__ = [
    'TaskModelSQL',
    'UserModelSQL',
]
```

---

## 🔗 `relations_registry.py`

Defines and registers relationships between models using SQLAlchemy's `relationship`.

Usage Example:

```python
# nexus/relations_registry.py

from sqlalchemy.orm import relationship

from .models_registry import UserModelSQL, TaskModelSQL

def register_users_relationships() -> None:
    UserModelSQL.tasks = relationship(
        'TaskModelSQL',
        back_populates='user',
        lazy='selectin',
        cascade='delete'
    )

def register_tasks_relationships() -> None:
    TaskModelSQL.user = relationship(
        'UserModelSQL',
        back_populates='tasks',
        lazy='joined',
        cascade='all'
    )

def register_all_relationships() -> None:
    register_users_relationships()
    register_tasks_relationships()
```
---
