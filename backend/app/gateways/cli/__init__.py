from typing import Final

from app.settings import settings

from .create_app import create_app

APP_NAME: Final = f"{settings.application.app_name} CLI"


app = create_app(
    app_name=APP_NAME,
)
