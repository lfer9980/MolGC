from pathlib import Path
from typing import Any, Dict, List

from .core.service import EmailService, SendMailException


async def safe_send_email(
    email_service: EmailService, template_name: str, context: dict, recipients: list
) -> None:
    """
    Args:
        email_service: Instancia del EmailService
        template_name: Nombre del template a usar
        context: Contexto para el template
        recipients: Lista de destinatarios

    Raises:
        SendMailException: Si ocurre algún error durante el envío
    """
    try:
        await email_service.send(
            template_name=template_name, context=context, recipients=recipients
        )
    except Exception as error:
        raise SendMailException.parse_exception(error)


async def safe_send_email_with_attachments(
    email_service: EmailService,
    template_name: str,
    context: dict,
    recipients: list,
    attachments: List[Path],
) -> None:
    """
    Args:
        email_service: Instancia del EmailService
        template_name: Nombre del template
        context: Contexto para el template
        recipients: Lista de destinatarios
        attachments: Lista de archivos adjuntos
    """
    try:
        await email_service.send(
            template_name=template_name,
            context=context,
            recipients=recipients,
            attachments=attachments,
        )
    except Exception as error:
        raise SendMailException.parse_exception(error)


async def safe_send_multiple_templates(
    email_service: EmailService, email_data: List[Dict[str, Any]]
) -> List[bool]:
    """
    Args:
        email_service: Instancia del EmailService
        email_data: Lista de diccionarios con datos de email
            Formato: [
                {
                    "template_name": "welcome",
                    "context": {"username": "John"},
                    "recipients": ["john@example.com"]
                },
                ...
            ]

    Returns:
        List[bool]: Lista de resultados (True si envío exitoso, False si falló)
    """
    results = []

    for email_info in email_data:
        try:
            await safe_send_email(
                email_service=email_service,
                template_name=email_info["template_name"],
                context=email_info["context"],
                recipients=email_info["recipients"],
            )
            results.append(True)

        except SendMailException:
            results.append(False)

    return results


async def safe_send_bulk_email(
    email_service: EmailService,
    template_name: str,
    recipients_with_context: List[Dict[str, Any]],
) -> Dict[str, List[str]]:
    """
    Args:
        email_service: Instancia del EmailService
        template_name: Nombre del template
        recipients_with_context: Lista con destinatario y contexto
            Formato: [
                {
                    "recipient": "john@example.com",
                    "context": {"username": "John", "custom_data": "..."}
                },
                ...
            ]

    Returns:
        Dict con listas de emails exitosos y fallidos
    """
    successful = []
    failed = []

    for recipient_data in recipients_with_context:
        try:
            await safe_send_email(
                email_service=email_service,
                template_name=template_name,
                context=recipient_data["context"],
                recipients=[recipient_data["recipient"]],
            )
            successful.append(recipient_data["recipient"])

        except SendMailException:
            failed.append(recipient_data["recipient"])

    return {
        "successful": successful,
        "failed": failed,
        "total": len(recipients_with_context),
        "success_rate": (
            len(successful) / len(recipients_with_context)
            if recipients_with_context
            else 0
        ),
    }
