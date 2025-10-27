# 🖥️ CLI Module

This module provides a dynamic command-line interface system built on Typer. It automatically discoversand registers CLI commands from application modules, with comprehensive logging and middleware support for command execution tracking.

---

## 📁 Folder Structure

```bash
|-- commands/
|   |-- get_commands.py    # Dynamic command discovery and registration
|   |-- __init__.py
|
|-- logging/
|   |-- logging.py         # CLI command logging middleware and decorators
|   |-- __init__.py
|
|-- create_app.py          # CLI application factory and initialization
|-- README.md
|-- __init__.py
```

---

## 📁 `comands/`

### `get_commands.py`

Implements dynamic command discovery that automatically scans application modules and registers CLI commands.

```python
def init_commands(_cli_: typer.Typer) -> None:
    # Automatically discovers and registers commands from app.src modules
```

The system follows a structured discovery pattern:

- **Module Scanning**: Iterates through all packages in app.src
- **Path Convention**: Looks for CLI commands at app.src.{module}.interfaces.cli.commands
- **Registration**: Automatically adds discovered cli instances to the main Typer app
- **Error Handling**: Gracefully handles missing modules with warning logs

---

## 📁 `logging/`

### `logging.py`

Provides middleware-style logging for CLI command execution with performance tracking and error handling

```python
@log_cli_command
def my_command():
    # Your command logic here
    pass
```

---

## `create_app.py`

Application factory that creates and configures the main CLI application with automatic command registration.

```python
def create_app(app_name: str = f"{settings.application.app_name} CLI") -> typer.Typer:
    cli = typer.Typer(help=app_name)
    init_commands(cli)
    return cli
```
