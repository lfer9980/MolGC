from pydantic_settings import BaseSettings


class CliAppSettings(BaseSettings):
    app_env: str = "development"
    app_name: str = "My App"
    debug: bool = False
    secret_key: str = "some_secret_key"
    app_version: str = "0.0.0"

    class Config:
        extra = "ignore"
