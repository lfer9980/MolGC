# 🧩 Users Example Module

This module handles all user-related functionality in a clean, scalable, and testable manner, following `Hexagonal Architecture`. It encapsulates business rules in the domain layer and exposes interfaces for external interaction via infrastructure and application layers.

---

## 📁 Folder Structure

```bash
src/<feature>/
│
├── application/
│   └── service/
│       ├── dto.py
│       ├── service.py
│       └── exceptions.py
│
├── domain/
│   ├── entities/
│   │   └── <entity>.py
│   ├── repositories/
│   │   └── <repository>.py
│   └── value_objects/
│       └── <value_object>.py
│
├── infrastructure/
│   ├── models/
│   │   └── sql/
│   │       └── <model>.py
│   └── repository/
│       └── sql/
│           └── <repository>.py
│
├── interfaces/
│   ├── api/
│   │   ├── <version>/
│   │   │   ├── private/
│   │   │   │   ├── <service>/
│   │   │   │   │   ├── request.py
│   │   │   │   │   ├── response.py
│   │   │   │   │   ├── route.py
│   │   │   │   │   └── __init__.py
│   │   │   │   ├── router.py
│   │   │   │   └── __init__.py
│   │   │   ├── public/
│   │   │   │   ├── <service>/
│   │   │   │   │   ├── request.py
│   │   │   │   │   ├── response.py
│   │   │   │   │   ├── route.py
│   │   │   │   │   └── __init__.py
│   │   │   │   ├── router.py
│   │   │   │   └── __init__.py
│   │   │   ├── router.py
│   │   │   └── __init__.py
│   │   └── router.py
│   ├── cli/
│   │   ├── <version>/
│   │   │   ├── <service>/
│   │   │   │   ├── command.py
│   │   │   │   └── __init__.py
│   │   │   └── __init__.py
│   │   └── commands.py
│   ├── __init__.py
│   ├── README.md
│   └── .gitkeep
│
└── __init__.py
```

---

## 🧠 Domain Layer

The `core` of the project, responsible for defining and implementing the business logic and use cases.

### `entities/<entity>.py`

Represents the core business model of a `<entity>`, with validation using Pydantic.

Example:

```python
from uuid import uuid4
from pydantic import Field

from app.elemental.common.schemas.elemental import ElementalSchema
from app.src.users.domain.value_objects.username import Username
from app.src.users.domain.value_objects.user_id import UserId


class UserEntity(ElementalSchema):
    id: UserId = Field(
        default_factory = lambda:str(uuid4().hex),
        description = "User id"
    )

    username:Username = Field(
        description = "Username"
    )
```

### `repositories/<repository>.py`

Abstract definition of use cases that can be performed independent of infrastructure.

Example:

```python
from abc import ABC, abstractmethod
from typing import List

from app.src.users.domain.entities.user_entity import UserEntity


class UserRepository(ABC):
    @abstractmethod
    async def create(self, user : UserEntity) -> UserEntity:
        pass

    @abstractmethod
    async def get_all(self, page : int, page_size : int) -> List[UserEntity]:
        pass
```

### `value_objects/<value_object>`

Encapsulates strongly typed data with custom validation and enforces value semantics.

```python
from pydantic_core.core_schema import str_schema

from app.elemental.common.value_object.elemental import ElementalValueObject


class Username(ElementalValueObject):

    __schema_type__ = str_schema()

    def __init__(self, value: str = None):
        self.value: str = self._validate(value)

    @staticmethod
    def _validate(value: str) -> str:
        if not value:
            raise ValueError("Required")

        return value

    def __str__(self) -> str:
        return self.value
```

---

## 🚀 Application Layer

Handles `use cases` by orchestrating interactions between the domain and infrastructure layer.

### `<service>/service.py`

Handles user creation logic by interacting with the domain and repository layers.

```python
from app.src.users.application.create.dto import CreateUserDTO
from app.src.users.domain.entities.user_entity import UserEntity
from app.src.users.domain.repositories.user_repository import UserRepository


class CreateUserService:
    def __init__(self, user_repository:UserRepository):
        self.user_repository = user_repository

    async def execute(self, new_user_info:CreateUserDTO) -> UserEntity:
        user_data = UserEntity(
            **new_user_info.model_dump()
        )

        return await self.user_repository.create(user=user_data)
```

### `<service>/dto.py`

Data Transfer Object (DTO) to encapsulate and validate user input.

```python
from app.elemental.common.schemas.elemental import ElementalSchema
from app.src.users.domain.value_objects.username import Username


class CreateUserDTO(ElementalSchema):
    username:Username
```

---

## 🏗 Infrastructure Layer

Implementations of repositories and database models.

### `models/sql/<model>.py`

SQLAlchemy model representing the `<model>` table and the fields.

Example:

```python
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.infrastructure.database.sql.models.tables import ElementalUUIDTable


class UserModelSQL(ElementalUUIDTable):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(
        String(),
        nullable=False,
        unique=True
    )
```

### `repository/sql/<repository>.py`

Implements the repository using SQLAlchemy and async sessions.

Example:

```python
from typing import List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.src.users.infrastructure.models.sql.user import UserModelSQL
from app.src.users.domain.entities.user_entity import UserEntity
from app.src.users.domain.repositories.user_repository import UserRepository


class UserRepositorySQL(UserRepository):
    def __init__(self, session:AsyncSession): #Session needed to conect with database
        self.session = session


    async def get_all(self, page: int, page_size: int) -> List[UserEntity]:
        if page < 1:
            raise ValueError("Page number must be 1 or greater")

        offset = (page - 1) * page_size
        stmt = select(UserModelSQL).offset(offset).limit(page_size)

        result = await self.session.execute(stmt)
        user_models = result.scalars().all()

        return [
            UserModelSQL(**user_model.model_dump())
            for user_model in user_models
        ]


    async def create(self, user:UserEntity) -> UserEntity:

        user_model = UserModelSQL(**user.model_dump())

        self.session.add(user_model)
        await self.session.commit()
        await self.session.refresh(user_model)

        return UserEntity(**user_model.model_dump())
```

---

## 🌐 Interfaces Layer

Handles cli or web interfaces.

### 🔗 API Interface (`interfaces/api`)

Exposes web endpoints using FastAPI.

#### `<version>/`

Encapsulate the public and private routes organized by version.

##### `private/`

Protected endpoints requiring authentication.

###### `<service>/request.py`

Defines request schema:

```python
from app.elemental.common import ElementalSchema

class GetAllRequest(ElementalSchema):
    username: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "username": "John doe",
                }
            ]
        }
    }
```

###### `private/__init__.py`

Module entry point:

```python
from .router import router
__all__ = ['router']
```

###### `private/router.py`

This router contains the private routers

Example:

```python
from fastapi import APIRouter

from .get_all import router as get_all_router

router = APIRouter(
    prefix="/private",
    tags=["users/private"]
)

router.include_router(get_all_router)
```

##### `public/`

Open endpoints available without authentication.

###### `public/router.py`

This router contains the public routers

Example:

```python
from fastapi import APIRouter

from .create import router as create_router

router = APIRouter(
    prefix="/public",
    tags=["users/public"]
)

router.include_router(create_router)
```

#### `<version>/router.py`

Includes both public and private routers.

Example:

```python
from fastapi import APIRouter

from .public import router as public_router
from .private import router as private_router

router = APIRouter(
    prefix='/v1'
)

router.include_router(public_router)
router.include_router(private_router)
```

---

### 🖥 CLI Interface (`interfaces/cli`)

Defines command-line interactions for users.

#### `<version>/`

Organized by version and command.

##### `<service>/command.py`

Implements user creation logic via CLI.

Example:

```python
import typer
import asyncio

from app.gateways.cli.logging.logging import log_cli_command

cli_command = typer.Typer()


@cli_command.command("run")
@log_cli_command
def create(
    username: str = typer.Option(..., "--username", "-u", help="Your name"),
    ) -> None:

    from app.settings import settings
    from app.infrastructure.database import DatabaseSession
    from app.src.users.application.create.dto import CreateUserDTO
    from app.src.users.application.create.service import CreateUserService
    from app.src.users.infrastructure.repository.sql.user_repository import UserRepositorySQL
    from app.infrastructure.database.sql.connection import init_database


    db_settings = settings.database
    async def run():
        await init_database(db_settings)
        async with DatabaseSession() as session:
            repo = UserRepositorySQL(session)
            service = CreateUserService(user_repository=repo)

            user_data = CreateUserDTO(
                username=username
            )

            user = await service.execute(user_data)
            typer.echo(f"User created {user.username}")

    asyncio.run(run())
```

##### `commands.py`

Encapsulate all available commands.

Example:

```python
import typer

from .v1.create import cli_command as create_cli

cli = typer.Typer()
cli.add_typer(create_cli, name='create')
```
---
