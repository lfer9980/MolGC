"""Initialize the API general entrypoint."""

import typer

from .settings import settings
from .src.nexus import *


def get_cover(runtime: str) -> None:
    """Load application cover."""
    typer.secho("=" * 50, fg=typer.colors.CYAN, bold=True)
    typer.secho("🚀 Application Configuration", fg=typer.colors.GREEN, bold=True)

    typer.secho("=" * 50, fg=typer.colors.CYAN, bold=True)

    config_items = {
        "App Name": settings.application.app_name,
        "Version": settings.application.app_version,
    }

    if settings.application.debug:
        config_items.update(
            {
                "Environment": settings.application.app_env,
                "Debug Mode": settings.application.debug,
                "Secret Key": settings.application.secret_key,
            }
        )

    if runtime == "web":
        config_items.update(
            {
                "API Docs": (
                    f"http://{settings.application.host}:"
                    f"{settings.application.port}/"
                ),
            }
        )

        if settings.application.debug:
            config_items.update(
                {
                    "Swagger": (
                        f"http://{settings.application.host}:"
                        f"{settings.application.port}/docs"
                    )
                }
            )

        if settings.application.use_celery:
            if settings.celery.use_redis:
                config_items.update(
                    {
                        "Celery broker": f"{settings.celery.broker_url}",
                        "Celery Backend": (f"{settings.celery.result_backend}"),
                    }
                )
            else:
                config_items.update(
                    {
                        "Celery broker": "memory://",
                        "Celery Backend": "rpc://",
                    }
                )

    for key, value in config_items.items():
        typer.secho(f"{key:<13}: ", fg=typer.colors.BLUE, nl=False)
        typer.secho(str(value), fg=typer.colors.WHITE, bold=True)

    typer.secho("=" * 50, fg=typer.colors.CYAN, bold=True)


def run(runtime: str) -> None:
    """Select and run the application in CLI or web mode."""
    VALID_MODES = {"cli", "web"}
    if runtime not in VALID_MODES:
        raise ValueError(f"Invalid runtime mode: '{runtime}'. Use 'cli' or 'web'.")

    get_cover(runtime)

    if runtime == "cli":
        from .gateways.cli import app

        app()

    elif runtime == "web":
        import uvicorn
        from app.settings import settings

        if settings.application.use_celery:
            typer.secho(
                "🌿 App integrated with Celery", fg=typer.colors.WHITE, bold=True
            )
            from app.infrastructure.celery.celery_app import celery

            typer.secho("=" * 50, fg=typer.colors.CYAN, bold=True)

        if settings.application.debug:
            uvicorn.run(
                "app.gateways.web:app",
                host=settings.application.host,
                port=settings.application.port,
                reload=True,
                access_log=False,
            )

        else:
            from .gateways.web import app

            uvicorn.run(
                app, host=settings.application.host, port=settings.application.port
            )
