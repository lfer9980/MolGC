from typing import Final

from app.settings import settings

from .create_app import create_app

API_VERSION: str = settings.application.app_version

API_TITLE: Final = f"{settings.application.app_name} API"

API_DESCRIPTION: Final = "API Description"

API_PREFIX: Final = "/api"

app = create_app(
    api_version=API_VERSION,
    api_title=API_TITLE,
    api_description=API_DESCRIPTION,
    api_prefix=API_PREFIX,
)
