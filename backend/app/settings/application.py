from app.elemental.settings import ElementalSettings
from app.infrastructure.database.sql.settings import DatabaseSettings

from .components.jwt import JWTSettings


class ApplicationSettings(ElementalSettings):
    jwt: JWTSettings = JWTSettings()
    database: DatabaseSettings

    class Config:
        extra = "ignore"
