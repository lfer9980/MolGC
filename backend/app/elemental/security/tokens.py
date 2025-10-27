from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple

import jwt
from app.elemental.exceptions import InvalidTokenError, TokenExpiredError
from app.settings import settings
from jwt.exceptions import ExpiredSignatureError, PyJWTError


class TokenService:
    """Servicio centralizado para manejo de JWT tokens."""

    @classmethod
    def create_access_token(
        cls,
        data: dict,
        days: int = 0,
        hours: int = 0,
        minutes: int = 0,
        seconds: int = 0,
    ) -> str:
        """Crear access token Migrado de tu tokens/access.py."""
        if not isinstance(data, dict):
            raise ValueError("Data must be a dict type")

        # Usar configuración por defecto o parámetros custom
        if not any([days, hours, minutes, seconds]):
            expires_delta = datetime.now(timezone.utc) + timedelta(
                seconds=settings.jwt.access_token_expire_seconds,
                minutes=settings.jwt.access_token_expire_minutes,
                hours=settings.jwt.access_token_expire_hours,
                days=settings.jwt.access_token_expire_days,
            )
        else:
            expires_delta = datetime.now(timezone.utc) + timedelta(
                days=days, hours=hours, minutes=minutes, seconds=seconds
            )

        payload = data.copy()
        payload.update({"exp": int(expires_delta.timestamp())})

        # modification to return expiration date
        return jwt.encode(
            payload=payload,
            key=settings.application.secret_key,
            algorithm=settings.jwt.algorithm,
        )

    @classmethod
    def create_refresh_token(
        cls,
        data: dict,
        days: int = 0,
        hours: int = 0,
        minutes: int = 0,
        seconds: int = 0,
    ) -> str:
        """Crear refresh token Migrado de tu tokens/access.py (función
        refresh)"""
        if not isinstance(data, dict):
            raise ValueError("Data must be a dict type")

        # Usar configuración por defecto para refresh token
        if not any([days, hours, minutes, seconds]):
            expires_delta = datetime.now(timezone.utc) + timedelta(
                seconds=settings.jwt.refresh_token_expire_seconds,
                minutes=settings.jwt.refresh_token_expire_minutes,
                hours=settings.jwt.refresh_token_expire_hours,
                days=settings.jwt.refresh_token_expire_days,
            )
        else:
            expires_delta = datetime.now(timezone.utc) + timedelta(
                days=days, hours=hours, minutes=minutes, seconds=seconds
            )

        payload = data.copy()
        payload.update({"exp": expires_delta.isoformat()})

        return jwt.encode(
            payload=payload,
            key=settings.application.secret_key,
            algorithm=settings.jwt.algorithm,
        )

    @classmethod
    def create_token(
        cls,
        data: dict,
        days: int = 0,
        hours: int = 0,
        minutes: int = 0,
        seconds: int = 0,
    ) -> str:
        """Crear token general Migrado de tu tokens/general.py."""
        return cls.create_access_token(data, days, hours, minutes, seconds)

    @classmethod
    def decode_token(cls, token: str) -> dict:
        """Decodificar token Migrado de tu tokens/decode.py."""
        try:
            payload: dict = jwt.decode(
                jwt=token,
                key=settings.application.secret_key,
                algorithms=[settings.jwt.algorithm],
            )
            return payload

        except ExpiredSignatureError:
            raise TokenExpiredError("Token has expired")

        except PyJWTError:
            raise InvalidTokenError("Invalid token")

        except Exception as e:
            raise InvalidTokenError(f"Error decoding JWT: {e}")

    @classmethod
    def verify_token(cls, token: str) -> bool:
        """Verificar validez del token Usado en tu jwt_bearer.py."""
        try:
            cls.decode_token(token)
            return True
        except (TokenExpiredError, InvalidTokenError):
            return False

    @classmethod
    def extract_payload(cls, token: str) -> Optional[dict]:
        """Extraer payload del token sin lanzar excepciones."""
        try:
            return cls.decode_token(token)
        except (TokenExpiredError, InvalidTokenError):
            return None

    @classmethod
    def is_token_expired(cls, token: str) -> bool:
        """Verificar si el token está expirado específicamente."""
        try:
            cls.decode_token(token)
            return False
        except TokenExpiredError:
            return True
        except InvalidTokenError:
            return False  # Token inválido, no expirado
