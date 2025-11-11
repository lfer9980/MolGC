import os
import sys

from app.elemental.settings.elemental import CliAppSettings, WebAppSettings

from .application import ApplicationSettings


def is_running_web() -> bool:
    return (
        "uvicorn" in sys.argv[0]
        or "gunicorn" in os.environ.get("SERVER_SOFTWARE", "").lower()
    )


def get_settings() -> ApplicationSettings:
    if is_running_web():
        app_settings = ApplicationSettings(application=WebAppSettings())
    else:
        app_settings = ApplicationSettings(application=CliAppSettings())

    return app_settings
