import re
from logging import Logger
from pathlib import Path
from typing import Any, Dict, List, Optional

from app.elemental.logging import get_logger

_logger = None


def get_logger() -> Logger:
    global _logger
    if _logger is None:
        _logger = get_logger("logs_database")
    return _logger


def validate_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None


def validate_email_list(emails: List[str]) -> Dict[str, List[str]]:
    valid = []
    invalid = []

    for email in emails:
        if validate_email(email):
            valid.append(email)
        else:
            invalid.append(email)

    return {
        "valid": valid,
        "invalid": invalid,
        "total": len(emails),
        "valid_count": len(valid),
        "invalid_count": len(invalid),
    }


def clean_email_list(emails: List[str]) -> List[str]:

    logger = get_logger()

    unique_emails = list(
        set(email.strip().lower() for email in emails if email.strip())
    )

    valid_emails = [email for email in unique_emails if validate_email(email)]

    logger.info(f"Cleaned email list: {len(emails)} -> {len(valid_emails)} emails")

    return valid_emails


def extract_domain_from_email(email: str) -> Optional[str]:
    if validate_email(email):
        return email.split("@")[1].lower()
    return None


def group_emails_by_domain(emails: List[str]) -> Dict[str, List[str]]:
    grouped = {}

    for email in emails:
        if validate_email(email):
            domain = extract_domain_from_email(email)
            if domain:
                if domain not in grouped:
                    grouped[domain] = []
                grouped[domain].append(email)

    return grouped


def sanitize_template_context(context: Dict[str, Any]) -> Dict[str, Any]:
    import html

    sanitized = {}

    for key, value in context.items():
        if isinstance(value, str):
            sanitized[key] = html.escape(value)

        elif isinstance(value, dict):
            sanitized[key] = sanitize_template_context(value)

        elif isinstance(value, list):
            sanitized[key] = [
                html.escape(item) if isinstance(item, str) else item for item in value
            ]
        else:

            sanitized[key] = value

    return sanitized


def validate_template_context_keys(
    context: Dict[str, Any], required_keys: List[str]
) -> Dict[str, Any]:
    present_keys = set(context.keys())
    required_keys_set = set(required_keys)

    missing_keys = required_keys_set - present_keys
    extra_keys = present_keys - required_keys_set

    return {
        "is_valid": len(missing_keys) == 0,
        "missing_keys": list(missing_keys),
        "extra_keys": list(extra_keys),
        "present_keys": list(present_keys),
    }


def get_file_size_mb(file_path: Path) -> float:
    if file_path.exists():
        size_bytes = file_path.stat().st_size
        return size_bytes / (1024 * 1024)
    return 0.0


def validate_attachments(
    attachments: List[Path],
    max_size_mb: float = 25.0,
    allowed_extensions: Optional[List[str]] = None,
) -> Dict[str, Any]:
    if allowed_extensions is None:
        allowed_extensions = [".pdf", ".doc", ".docx", ".txt", ".jpg", ".png", ".zip"]

    valid_files = []
    invalid_files = []
    total_size = 0.0

    for file_path in attachments:
        file_info = {
            "path": str(file_path),
            "exists": file_path.exists(),
            "size_mb": 0.0,
            "extension": file_path.suffix.lower(),
            "issues": [],
        }

        if not file_path.exists():
            file_info["issues"].append("File does not exist")
        else:
            file_info["size_mb"] = get_file_size_mb(file_path)
            total_size += file_info["size_mb"]

            if file_info["size_mb"] > max_size_mb:
                file_info["issues"].append(
                    f"File too large ({file_info['size_mb']:.2f}MB > {max_size_mb}MB)"
                )

            if file_info["extension"] not in allowed_extensions:
                file_info["issues"].append(
                    f"Extension not allowed: {file_info['extension']}"
                )

        if file_info["issues"]:
            invalid_files.append(file_info)
        else:
            valid_files.append(file_info)

    return {
        "valid_files": valid_files,
        "invalid_files": invalid_files,
        "total_files": len(attachments),
        "total_size_mb": total_size,
        "is_valid": len(invalid_files) == 0,
    }


def create_email_template_registry(
    templates_config: List[Dict[str, Any]],
) -> Dict[str, Dict[str, Any]]:

    logger = get_logger()

    registry = {}

    for config in templates_config:
        name = config["name"]
        registry[name] = {
            "template": config["template"],
            "subject": config["subject"],
            "context_model": config.get("context_model"),
            "description": config.get("description", ""),
        }

        logger.debug(f"Added template '{name}' to registry")

    logger.info(f"Created template registry with {len(registry)} templates")
    return registry
