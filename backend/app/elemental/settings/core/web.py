from pydantic_settings import BaseSettings


class WebAppSettings(BaseSettings):
    app_env: str = "development"
    app_name: str = "My App"
    debug: bool = False
    secret_key: str = "some_secret_key"
    app_version: str = "0.0.0"

    host: str = "localhost"
    port: int = 8000

    cors_origins: list[str] = ["*"]
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ["*"]
    cors_allow_headers: list[str] = ["*"]
    max_age: int = 3600

    storage_path: str = "files"
    max_file_size: int = 50 * 1024 * 1024

    ws_channel_prefix: str = "ws_channel"
    use_celery: bool = True

    class Config:
        extra = "ignore"
