from pydantic_settings import BaseSettings


class CelerySettings(BaseSettings):
    """Celery settings"""

    use_redis: bool = True
    use_database: bool = True
    redis_url: str = "redis://redis:6379/0"
    broker_url: str = "redis://redis:6379/1"
    result_backend: str = "redis://redis:6379/2"

    class Config:
        extra = "ignore"
