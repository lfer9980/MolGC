# app/gateways/web/auth/dependencies.py
from typing import Any, Dict, List, Optional, Union

from app.elemental.exceptions import ForbiddenError, UnauthorizedError
from app.elemental.security import TokenService
from app.elemental.security.roles import ElementalRoleChecker
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .jwt_bearer import JWTBearer

# Instancia del JWTBearer
jwt_bearer = JWTBearer()


async def get_current_user_token(token: str = Depends(jwt_bearer)) -> str:
    """Dependency que retorna el token JWT válido."""
    return token


async def get_current_user_payload(
    token: str = Depends(get_current_user_token),
) -> Dict[str, Any]:
    """Dependency que retorna el payload decodificado del token JWT."""
    try:
        payload = TokenService.decode_token(token)
        if not isinstance(payload, dict):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token format",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user_info(
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> Dict[str, Any]:
    """Dependency que extrae la información completa del usuario usando
    ElementalRoleChecker."""
    return ElementalRoleChecker.extract_user_info(payload)


async def get_current_user_id(
    user_info: Dict[str, Any] = Depends(get_current_user_info),
) -> str:
    """Dependency que extrae el user_id del token JWT."""
    print(user_info)
    user_id = user_info.get("id") or user_info.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing user identification",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_id


async def get_current_user_role(
    user_info: Dict[str, Any] = Depends(get_current_user_info),
) -> Union[str, int]:
    """Dependency que extrae el rol del usuario del token JWT."""
    role = user_info.get("role")
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing user role",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return role


async def get_current_user_permissions(
    payload: Dict[str, Any] = Depends(get_current_user_payload),
) -> List[str]:
    """Dependency que extrae los permisos del usuario del token JWT."""
    return ElementalRoleChecker.get_user_permissions(payload)


# Factory function para verificar roles específicos usando ElementalRoleChecker
def require_roles(*allowed_roles: Union[str, int]):
    """Factory function para crear dependencies que requieren roles
    específicos. Usa tu ElementalRoleChecker existente.

    Uso: @app.get("/admin", dependencies=[Depends(require_roles("admin", 1))])
    """

    async def check_roles(
        payload: Dict[str, Any] = Depends(get_current_user_payload),
    ) -> Dict[str, Any]:
        try:
            # Usa tu ElementalRoleChecker para validar roles
            return ElementalRoleChecker.require_role(payload, *allowed_roles)
        except UnauthorizedError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=str(e),
                headers={"WWW-Authenticate": "Bearer"},
            )
        except ForbiddenError as e:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(e))

    return check_roles


# Factory function para verificar permisos específicos
def require_permission(required_permission: str):
    """Factory function para crear dependencies que requieren permisos
    específicos.

    Uso: @app.get("/delete", dependencies=[Depends(require_permission("delete_users"))])
    """

    async def check_permission(
        payload: Dict[str, Any] = Depends(get_current_user_payload),
    ) -> Dict[str, Any]:
        if not ElementalRoleChecker.has_permission(payload, required_permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission required: {required_permission}",
            )
        return payload

    return check_permission
