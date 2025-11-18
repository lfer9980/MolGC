from typing import List, Union

from app.elemental.exceptions import ForbiddenError, UnauthorizedError


class ElementalRoleChecker:
    """Checker de roles y permisos."""

    @staticmethod
    def validate_roles(*allowed_roles: Union[str, int]) -> None:
        """Validar que los roles sean del tipo correcto."""
        if not all(isinstance(role, (str, int)) for role in allowed_roles):
            raise ValueError("Roles must be string or int type")

    @classmethod
    def check_user_role(
        cls, token_payload: dict, allowed_roles: Union[List[Union[str, int]], tuple]
    ) -> bool:
        """Verificar si el rol del usuario está permitido Migrado de tu
        secure_route.py."""
        cls.validate_roles(*allowed_roles)

        role = token_payload.get("role")
        if not role:
            return False

        return role in allowed_roles

    @classmethod
    def require_role(cls, token_payload: dict, *allowed_roles: Union[str, int]) -> dict:
        """Requerir que el usuario tenga uno de los roles permitidos Lanza
        excepción si no tiene permisos."""
        if not token_payload:
            raise UnauthorizedError("No authentication token provided")

        if not cls.check_user_role(token_payload, allowed_roles):
            user_role = token_payload.get("role", "None")
            raise ForbiddenError(f"Operation not permitted for role: {user_role}")

        return token_payload

    @staticmethod
    def extract_user_info(token_payload: dict) -> dict:
        """Extraer información del usuario del token."""
        return {
            "id": token_payload.get("id"),
            "username": token_payload.get("username"),
            "role": token_payload.get("role"),
            "email": token_payload.get("email"),
            "sub": token_payload.get("id"),  # Subject (standard JWT claim)
            "iat": token_payload.get("iat"),  # Issued at
            "exp": token_payload.get("exp"),  # Expiration
        }

    @staticmethod
    def get_user_permissions(token_payload: dict) -> List[str]:
        """Obtener permisos del usuario (si están en el token)"""
        return token_payload.get("permissions", [])

    @classmethod
    def has_permission(cls, token_payload: dict, required_permission: str) -> bool:
        """Verificar si el usuario tiene un permiso específico."""
        user_permissions = cls.get_user_permissions(token_payload)
        return required_permission in user_permissions
