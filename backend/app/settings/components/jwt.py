from pydantic_settings import BaseSettings


class JWTSettings(BaseSettings):
    """
    Configuración JWT - Mantiene tu estructura exacta
    """

    algorithm: str = "HS256"

    # Access token
    access_token_expire_seconds: int = 0
    access_token_expire_minutes: int = 0
    access_token_expire_hours: int = 1
    access_token_expire_days: int = 0

    # Refresh token
    refresh_token_expire_seconds: int = 0
    refresh_token_expire_minutes: int = 0
    refresh_token_expire_hours: int = 0
    refresh_token_expire_days: int = 7

    class Config:
        extra = "ignore"
