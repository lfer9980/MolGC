# 📝 Logging Module

This package provides a flexible and extensible logging system for your backend, supporting multiple formats, colorized output, and file rotation. All loggers are based on Python's standard `logging` module, with custom formatters and easy setup utilities.

---

## 📁 Folder Structure

```bash
|-- formatters.py
|-- logger.py
|-- README.md
|-- __init__.py
```

---

## How to Use

You can use this logging module to add structured, colored, or JSON logs to your application. The logger is preconfigured with console and file handlers, and supports custom formatters.

### Basic Usage

```python
from app.elemental.logging.logger import logger

logger.info("Application started")
logger.warning("This is a warning")
logger.error("An error occurred")
```

### Custom Logger

You can create or retrieve a named logger:

```python
from app.elemental.logging.logger import get_logger

my_logger = get_logger("my_module")
my_logger.debug("Debug message from my_module")
```

### Log Formatting

The module provides several built-in formatters:
- **standard**: Timestamp, level, logger name, message
- **detailed**: Includes module, function, and line number
- **colored**: Like standard, but with colored level names for console output
- **json**: Outputs logs as JSON objects
- **simple**: Level and message only

You can select or add a formatter using:

```python
from app.elemental.logging.formatters import get_formatter, add_custom_formatter

formatter = get_formatter("json")
add_custom_formatter("my_format", formatter)
```

---

## 📂 formatters.py

Defines custom log formatters:

- **ColoredFormatter**: Adds color to log levels for better readability in the console.
- **JSONFormatter**: Outputs logs as JSON, including timestamp, level, logger, message, module, function, and line number.
- **Elemental_Log_Formatters**: Dictionary of available formatters.
- **get_formatter(name)**: Retrieve a formatter by name.
- **add_custom_formatter(name, formatter)**: Register a new custom formatter.

---

## 📂 logger.py

Provides logger setup and retrieval utilities:

- **setup_logger(name)**: Configures a logger with console (colored) and file (detailed) handlers, with file rotation.
- **get_logger(name)**: Retrieves or creates a logger instance.
- **logger**: A global logger instance ready to use.

---

## Example

```python
from app.elemental.logging.logger import logger

logger.info("Server started")
logger.error("Failed to connect to database", extra={"user_id": 123})
```

Log files are stored in the `logs/` directory with rotation enabled.

---

**Note:**
You can extend this module by adding your own formatters or handlers as needed for your application.
