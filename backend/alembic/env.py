"""Alembic environment configuration for database migrations."""

from logging.config import fileConfig

from alembic import context
from app.elemental.exceptions import DatabaseError
from app.infrastructure.database.sql.models.declarative import ElementalSQLBase
from app.settings import settings
from app.src.nexus import *
from sqlalchemy import Connection, engine_from_config, event, pool
from sqlalchemy.ext.asyncio import AsyncEngine

base = ElementalSQLBase()

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = base.metadata

if not hasattr(settings, "database"):
    raise DatabaseError(message="Database is not configured")

db_settings = settings.database

db_driver = db_settings.driver

if db_driver == "sqlite" or db_driver == "sqlite+aiosqlite":
    _db_url: str = f"{db_driver}:///{db_settings.name}"
else:
    _db_url: str = (
        f"{db_driver}://{db_settings.user}:{db_settings.password}@"
        f"{db_settings.host}:{db_settings.port}/{db_settings.name}"
    )

config.set_main_option("sqlalchemy.url", _db_url)


def run_migrations_offline() -> None:
    """Run Alembic migrations in offline mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    """Run Alembic migrations in an online (connected) context."""
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run Alembic migrations asynchronously in online mode."""
    connectable = AsyncEngine(
        engine_from_config(
            config.get_section(config.config_ini_section, {}),
            prefix="sqlalchemy.",
            poolclass=pool.NullPool,
            future=True,
        )
    )

    # Added to support ON DELETE CASCADE in SQLite
    if db_driver == "sqlite" or db_driver == "sqlite+aiosqlite":

        @event.listens_for(connectable.sync_engine, "connect")
        def set_sqlite_pragma(dbapi_connection, connection_record) -> None:
            """Enable foreign key constraints in SQLite connections."""
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    import asyncio

    asyncio.run(run_migrations_online())
