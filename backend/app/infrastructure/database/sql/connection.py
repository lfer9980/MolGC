from logging import Logger
from typing import Optional

from app.elemental.exceptions import DatabaseError
from app.elemental.logging import get_logger
from sqlalchemy import event
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.asyncio.engine import AsyncEngine

from .settings import DatabaseSettings

_logger = None
_engine: Optional[AsyncEngine] = None
_session_factory: Optional[async_sessionmaker[AsyncSession]] = None


def get_db_logger() -> Logger:
    global _logger
    if _logger is None:
        _logger = get_logger("database_logger")
    return _logger


async def init_database(settings: DatabaseSettings) -> None:
    global _engine, _session_factory
    logger = get_db_logger()
    try:
        logger.info("Initializing database connection...")
        logger.debug(
            f"Configuration: driver={settings.driver}, host={settings.host}, db={settings.name}"
        )

        if settings.driver.startswith("sqlite"):
            url = f"{settings.driver}:///{settings.name}"
            _engine = create_async_engine(
                url,
                echo=settings.echo,
                future=True,
                connect_args={"check_same_thread": False},
            )
        else:
            url = f"{settings.driver}://{settings.user}:{settings.password}@{settings.host}:{settings.port}/{settings.name}"
            _engine = create_async_engine(
                url,
                echo=settings.echo,
                pool_size=settings.pool_size,
                max_overflow=settings.max_overflow,
                future=True,
            )

        if not _engine:
            raise DatabaseError(
                "Database engine could not be created due to bad configuration"
            )

        # added to make support to massive deletion with ON DELETE CASCADE for SQLite
        if settings.driver.startswith("sqlite"):

            @event.listens_for(_engine.sync_engine, "connect")
            def set_sqlite_pragma(dbapi_conn, connection_record):
                cursor = dbapi_conn.cursor()
                cursor.execute("PRAGMA foreign_keys=ON")
                cursor.close()

            logger.info("SQLite Foreign Keys enabled (ON DELETE CASCADE support)")

        logger.info(f"Engine successfully created: {_engine}")

        _session_factory = async_sessionmaker(
            _engine, expire_on_commit=False, class_=AsyncSession
        )
        logger.info("Session factory successfully created")
        logger.info("Database initialized successfully")

    except SQLAlchemyError as e:
        logger.error(f"SQLAlchemy error initializing database: {e}")
        raise DatabaseError(f"Failed to initialize database: {e}") from e
    except Exception as e:
        logger.error(f"Unexpected error initializing database: {e}")
        raise DatabaseError(f"Failed to initialize database: {e}") from e


async def get_session() -> AsyncSession:
    """Creates and returns a new async database session.

    WARNING: You must manually close the session when done.
    """
    logger = get_db_logger()

    if _session_factory is None:
        logger.error("Session factory not initialized, call init_database() first")
        raise DatabaseError("Database not initialized. Call init_database() first.")

    try:
        session = _session_factory()
        logger.debug(f"Session created: {session}")
        return session
    except SQLAlchemyError as e:
        logger.error(f"Error creating database session: {e}")
        raise DatabaseError(f"Failed to create database session: {e}") from e


async def get_session_dependency():
    """FastAPI dependency generator for database sessions. Handles complete
    session lifecycle with automatic rollback/commit/close.

    Usage:
        @app.get("/users/")
        async def get_users(db: AsyncSession = Depends(get_db_session)):
            # Use session here
    """
    logger = get_db_logger()

    if _session_factory is None:
        logger.error("Session factory not initialized")
        raise DatabaseError("Database not initialized. Call init_database() first.")

    session = None
    try:
        session = _session_factory()
        logger.debug(f"Session created: {session}")
        yield session

    except SQLAlchemyError as e:
        if session:
            await session.rollback()
            logger.warning(f"Session rolled back due to SQLAlchemy error: {e}")
        raise DatabaseError(f"Database session error: {e}") from e

    except Exception as e:
        if session:
            await session.rollback()
            logger.warning(f"Session rolled back due to unexpected error: {e}")
        raise

    finally:
        if session:
            await session.close()
            logger.debug("Session closed")


async def close_database() -> None:
    """Closes the database engine and releases resources.

    Should be called on application shutdown.
    """
    global _engine, _session_factory
    logger = get_db_logger()

    if _engine:
        logger.info("Closing database connection...")
        await _engine.dispose()
        _engine = None
        _session_factory = None
        logger.info("Database connection closed")


def get_engine() -> AsyncEngine:
    """Returns the database engine for direct uses (migrations, raw queries,
    etc.)."""
    if _engine is None:
        raise DatabaseError("Database not initialized")
    return _engine


def is_database_initialized() -> bool:
    """Checks if the database has been initialized."""
    return _session_factory is not None


class DatabaseSession:
    """Async context manager to handle sessions with automatic commit/rollback.

    Usage:
        async with DatabaseSession() as session:
            # Use session for operations
            # Auto-commit on success, auto-rollback on exception
    """

    def __init__(self):
        self.session: Optional[AsyncSession] = None

    async def __aenter__(self) -> AsyncSession:
        logger = get_db_logger()

        if _session_factory is None:
            logger.error("Session factory not initialized")
            raise DatabaseError("Database not initialized. Call init_database() first.")

        try:
            self.session = _session_factory()
            logger.debug(f"Session created in context manager: {self.session}")
            return self.session
        except SQLAlchemyError as e:
            logger.error(f"Error creating session in context manager: {e}")
            raise DatabaseError(f"Failed to create database session: {e}") from e

    async def __aexit__(self, exc_type, exc_val, exc_tb) -> None:
        logger = get_db_logger()
        if self.session:
            try:
                if exc_type:
                    await self.session.rollback()
                    logger.warning("Session rolled back due to exception")
                else:
                    await self.session.commit()
                    logger.debug("Session committed successfully")
            except SQLAlchemyError as e:
                logger.error(f"Error during session cleanup: {e}")
                try:
                    await self.session.rollback()
                    logger.warning("Emergency rollback performed")
                except Exception as rollback_error:
                    logger.error(f"Failed to rollback during cleanup: {rollback_error}")
            finally:
                await self.session.close()
                logger.debug("Session closed")
