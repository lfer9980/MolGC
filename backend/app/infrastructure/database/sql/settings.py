from pydantic import BaseModel, Field


class DatabaseSettings(BaseModel):
    """Database configuration settings.

    This class defines the configuration options for database
    connections. It includes settings for the database driver,
    connection details, and connection pool configuration.
    """

    driver: str = Field(description="Database driver (e.g., postgresql, sqlite)")

    host: str = Field(description="Database host")

    port: str = Field(description="Database port")

    name: str = Field(description="Database name")

    user: str = Field(description="Database user")

    password: str = Field(description="Database password")

    pool_size: int = Field(default=5, description="Connection pool size")

    max_overflow: int = Field(
        default=10, description="Maximum number of overflow connections"
    )

    echo: bool = Field(default=False, description="Whether to echo SQL statements")
