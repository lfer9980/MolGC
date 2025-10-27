from app.settings import settings
from starlette.middleware.sessions import SessionMiddleware

session_middleware = (
    SessionMiddleware,
    {
        "secret_key": settings.application.secret_key,
        "max_age": settings.application.max_age,
    },
)
