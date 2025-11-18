import os
from pathlib import Path

from pydantic_settings import BaseSettings as PydanticBaseSettings
from pydantic_settings import (
    PydanticBaseSettingsSource,
    SettingsConfigDict,
    TomlConfigSettingsSource,
)

from .core.celery import CelerySettings
from .core.cli import CliAppSettings
from .core.web import WebAppSettings


class ElementalSettings(PydanticBaseSettings):
    application: WebAppSettings | CliAppSettings
    celery: CelerySettings

    model_config = SettingsConfigDict(
        env_prefix="elementalback_",
        env_nested_delimiter="__",
        env_file=None,
        extra="ignore",
    )

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: type[PydanticBaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> tuple[PydanticBaseSettingsSource, ...]:
        app_env: str = os.environ.get("elementalback_application__app_env")

        if app_env:
            return (
                init_settings,
                env_settings,
                dotenv_settings,
                file_secret_settings,
            )

        return (
            TomlConfigSettingsSource(settings_cls, toml_file=Path("settings.dev.toml")),
        )
