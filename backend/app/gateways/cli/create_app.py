import typer
from app.settings import settings

from .commands.get_commands import init_commands


def create_app(app_name: str = f"{settings.application.app_name} CLI") -> typer.Typer:
    cli = typer.Typer(help=app_name)
    init_commands(cli)
    return cli
