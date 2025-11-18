from .application import ApplicationSettings
from .get_settings import get_settings

settings = get_settings()

__all__ = ["settings", "ApplicationSettings"]
