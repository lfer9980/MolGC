import re
import secrets
import string

from app.elemental.exceptions import WeakPasswordError
from passlib.context import CryptContext

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return _pwd_context.verify(plain_password, hashed_password)


def needs_rehashing(hashed_password: str) -> bool:
    return _pwd_context.needs_update(hashed_password)


def validate_password_strength(
    password: str,
    *,
    min_length: int = 8,
    require_uppercase: bool = True,
    require_lowercase: bool = True,
    require_number: bool = True,
    require_special: bool = False,
    special_chars_pattern: str = r"[!@#$%^&*()_+=\[\]{};':\"\\|,.<>/?`~-]",
) -> bool:
    if len(password) < min_length:
        raise WeakPasswordError(
            f"Password must be at least {min_length} characters long"
        )

    if require_uppercase and not re.search(r"[A-Z]", password):
        raise WeakPasswordError("Password must contain at least one uppercase letter")

    if require_lowercase and not re.search(r"[a-z]", password):
        raise WeakPasswordError("Password must contain at least one lowercase letter")

    if require_number and not re.search(r"\d", password):
        raise WeakPasswordError("Password must contain at least one number")

    if require_special and not re.search(special_chars_pattern, password):
        raise WeakPasswordError("Password must contain at least one special character")

    return True


def generate_secure_password(length: int = 12) -> str:
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return "".join(secrets.choice(alphabet) for _ in range(length))
