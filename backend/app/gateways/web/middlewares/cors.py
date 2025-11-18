from app.settings import settings
from fastapi.middleware.cors import CORSMiddleware

cors_middleware = (
    CORSMiddleware,
    {
        "allow_origins": settings.application.cors_origins,
        "allow_credentials": settings.application.cors_allow_credentials,
        "allow_methods": settings.application.cors_allow_methods,
        "allow_headers": settings.application.cors_allow_headers,
    },
)
