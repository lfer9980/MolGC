from app.settings import settings
from fastapi import FastAPI

from .lifespan import app_lifespan
from .middlewares import (
    cors_middleware,
    exception_middleware,
    logging_middleware,
    session_middleware,
)
from .routers import elemental_router, get_all_routers


def __init_routers__(_app_: FastAPI, api_prefix: str = "") -> None:

    for router in get_all_routers():
        elemental_router.include_router(router)

    _app_.include_router(router=elemental_router, prefix=api_prefix)


def __init_middlewares__(_app_: FastAPI) -> None:

    middleware_list = [
        exception_middleware,
        cors_middleware,
        session_middleware,
        logging_middleware,
    ]

    for middleware_class, options in middleware_list:
        _app_.add_middleware(middleware_class, **options)


def create_app(
    api_version: str, api_title: str, api_description: str, api_prefix: str
) -> FastAPI:
    _app_ = FastAPI(
        version=api_version,
        title=api_title,
        description=api_description,
        swagger_url="/docs",
        redoc_url="/",
        openapi_url="/openapi.json",
        debug=settings.application.debug,
        lifespan=app_lifespan,
    )

    __init_routers__(_app_, api_prefix=api_prefix)

    __init_middlewares__(_app_)

    return _app_
