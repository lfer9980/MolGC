from pydantic_settings import BaseSettings


class CelerySettings(BaseSettings):
    """Celery settings."""

    use_redis: bool = True
    use_database: bool = True
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/1"
    celery_result_backend: str = "redis://localhost:6379/2"

    class Config:
        extra = "ignore"
