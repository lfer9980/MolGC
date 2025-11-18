from pydantic import EmailStr, Field
from pydantic_settings import BaseSettings


class EmailSettings(BaseSettings):

    username: str = Field(..., description="SMTP username")
    password: str = Field(..., description="SMTP password")
    server: str = Field(..., description="SMTP server hostname")
    port: int = Field(587, description="SMTP server port")
    use_tls: bool = Field(True, description="Enable STARTTLS")
    use_ssl: bool = Field(False, description="Enable SSL/TLS")
    sender: EmailStr = Field(..., description="Default sender email address")

    timeout: int = Field(30, description="Connection timeout in seconds")
    max_retries: int = Field(3, description="Max retry attempts")

    class Config:
        env_prefix = "EMAIL_"
