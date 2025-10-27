from .email import (
    TemplateContext,
    create_email_service,
    create_email_service_from_config,
    init_global_email_service,
    is_email_service_initialized,
    safe_send_email,
    safe_send_email_with_attachments,
    safe_send_multiple_templates,
)

__all__ = [
    "TemplateContext",
    "create_email_service",
    "create_email_service_from_config",
    "init_global_email_service",
    "is_email_service_initialized",
    "safe_send_email",
    "safe_send_email_with_attachments",
    "safe_send_multiple_templates",
]
