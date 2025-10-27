from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from logging import Logger
from pathlib import Path
from typing import Any, Dict, List, Optional

import aiosmtplib
from jinja2 import Environment, FileSystemLoader

from .exceptions import EmailConnectionError, EmailError


class SendMailException(EmailError):
    """Exception compatible con tu código original Wrapper para mantener
    compatibilidad con tu API."""

    def __init__(
        self,
        status_code: int = 500,
        detail: str = None,
        original_exception: Exception = None,
        **kwargs,
    ):
        super().__init__(detail or "Email service error", **kwargs)
        self.status_code = status_code
        self.original_exception = original_exception

    @classmethod
    def parse_exception(cls, exc: Exception) -> "SendMailException":
        """Parse exception - Método que usabas en tu código original"""
        detail = f"Error sending the email: {str(exc)}"
        return cls(status_code=500, detail=detail, original_exception=exc)


class EmailService:
    """Email Service manteniendo tu estructura original Solo reemplaza FastMail
    con aiosmtplib."""

    def __init__(
        self,
        templates_dir: Path,
        templates_context: dict,
        smtp_server: str,
        logger: Logger,
        smtp_port: int = 587,
        username: str = "",
        password: str = "",
        sender: str = "",
        use_tls: bool = True,
        use_ssl: bool = False,
        timeout: int = 30,
    ):

        self.templates_dir = templates_dir
        self.env = Environment(
            loader=FileSystemLoader(str(self.templates_dir)), autoescape=True
        )
        self.templates_context: dict = templates_context

        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.username = username
        self.password = password
        self.sender = sender or username
        self.use_tls = use_tls
        self.use_ssl = use_ssl
        self.timeout = timeout

        self.logger = logger

        logger.info(f"EmailService inicializado con templates en: {templates_dir}")

    def _validate_context(self, template_name: str, context: Dict[str, Any]) -> None:
        """Validate the context against the appropriate model.

        Tu método original - sin cambios
        """
        try:
            if template_name not in self.templates_context:
                raise SendMailException(
                    status_code=400, detail=f"Unknown template: {template_name}"
                )

            context_model = self.templates_context[template_name]["context_model"]
            context_model(**context)

        except SendMailException:
            raise
        except Exception as e:
            raise SendMailException(
                status_code=400,
                detail=f"Invalid context for {template_name}: {str(e)}",
                original_exception=e,
            )

    def _fill_template(self, template_name: str, context: Dict[str, Any]) -> str:
        """Fill a template with the provided context.

        Tu método original - sin cambios
        """
        try:
            template_path = self.templates_context[template_name]["template"]
            template = self.env.get_template(template_path)
            return template.render(**context)

        except Exception as e:
            self.logger.error(f"Error filling template {template_name}: {str(e)}")
            raise SendMailException(
                status_code=500,
                detail=f"Error filling template {template_name}: {str(e)}",
                original_exception=e,
            )

    async def _create_smtp_connection(self) -> aiosmtplib.SMTP:
        """Crear conexión SMTP con aiosmtplib."""
        try:
            smtp = aiosmtplib.SMTP(
                hostname=self.smtp_server,
                port=self.smtp_port,
                timeout=self.timeout,
                use_tls=self.use_ssl,
                start_tls=self.use_tls,
            )

            await smtp.connect()

            if self.username and self.password:
                await smtp.login(self.username, self.password)

            self.logger.debug(f"SMTP connection established to {self.smtp_server}")
            return smtp

        except Exception as e:
            self.logger.error(f"Failed to connect to SMTP server: {e}")
            raise EmailConnectionError(f"SMTP connection failed: {str(e)}")

    def _create_message(
        self,
        recipients: List[str],
        subject: str,
        html_content: str,
        attachments: Optional[List[Path]] = None,
    ) -> MIMEMultipart:
        """Crear mensaje MIME (reemplaza MessageSchema de FastAPI-Mail)"""
        message = MIMEMultipart()
        message["From"] = self.sender
        message["To"] = ", ".join(recipients)
        message["Subject"] = subject

        # Agregar contenido HTML
        html_part = MIMEText(html_content, "html", "utf-8")
        message.attach(html_part)

        # Agregar attachments si existen
        if attachments:
            for file_path in attachments:
                if file_path.exists() and file_path.is_file():
                    try:
                        with open(file_path, "rb") as attachment_file:
                            part = MIMEBase("application", "octet-stream")
                            part.set_payload(attachment_file.read())
                            encoders.encode_base64(part)

                            part.add_header(
                                "Content-Disposition",
                                f"attachment; filename= {file_path.name}",
                            )
                            message.attach(part)

                        self.logger.debug(f"Attached file: {file_path.name}")

                    except Exception as e:
                        self.logger.warning(f"Failed to attach file {file_path}: {e}")

        return message

    async def send(
        self,
        template_name: str,
        context: Dict[str, Any],
        recipients: List[str],
        attachments: Optional[List[Path]] = None,
    ) -> None:
        """Send an email using a template and context.

        Args:
            template_name (str): The name of the template to use (e.g., 'welcome')
            context (Dict[str, Any]): The context data to fill in the template
            recipients (List[str]): List of recipient email addresses
            attachments (Optional[List[Path]]): Optional list of file paths to attach
        """
        try:
            self.logger.info(
                f"Sending template email: {template_name} to {len(recipients)} recipients"
            )

            # Validate context (tu código original)
            self._validate_context(template_name, context)

            # Fill template (tu código original)
            html_content = self._fill_template(template_name, context)

            # Get subject from template context (tu código original)
            subject = self.templates_context[template_name]["subject"]

            # Crear mensaje con aiosmtplib (reemplaza MessageSchema)
            message = self._create_message(
                recipients, subject, html_content, attachments
            )

            # Enviar con aiosmtplib (reemplaza FastMail)
            smtp = await self._create_smtp_connection()
            try:
                await smtp.send_message(message)
                self.logger.info(f"Email sent successfully: {template_name}")

            finally:
                await smtp.quit()

        except SendMailException:
            raise

        except Exception as e:
            self.logger.error(f"Failed to send email: {e}")
            raise SendMailException.parse_exception(e)
