# 🔐 Security Module

This module centralizes the application's security logic, providing robust password management, role-based access control, and JWT token handling. It follows security best practices and integrates seamlessly with the application's authentication and authorization workflows.

---

## 📁 Folder Structure

```bash
|-- password.py
|-- roles.py
|-- tokens.py
|-- README.md
|-- __init__.py
```

---

### `password.py`

Password hashing, validation, and generation utilities

Provides secure password handling utilities with industry-standard cryptographic practices.

---

```python
from app.elemental.security.password import get_password_hash, verify_password

hashed = get_password_hash("MySecurePassword123!")
is_valid = verify_password("MySecurePassword123!", hashed)
```

- **get_password_hash()**: Creates secure bcrypt hash of passwords
- **verify_password()**: Validates passwords against stored hashes
- **validate_password_strength()**: Enforces password complexity requirements
- **generate_secure_password()**: Generates cryptographically secure random

---


### `roles.py`

Role validation and permission management

Implements role-based access control (RBAC) with flexible permission management.

---

```python
from app.elemental.security.roles import ElementalRoleChecker

payload = {"role": "admin", "permissions": ["read", "write"]}
ElementalRoleChecker.require_role(payload, "admin", "superuser")
```

- **check_user_role()**: Validates if user has required role
- **require_role()**: Enforces role requirements with exception handling
- **extract_user_info()**: Safely extracts user data from token payload
- **has_permission()**: Checks specific permissions for fine-grained access control

---

### `tokens.py`

JWT creation, validation, and lifecycle management

Manages JWT token lifecycle with secure creation, validation, and expiration handling.

```python
from app.elemental.security.tokens import TokenService

token = TokenService.create_access_token({"user_id": 1, "role": "admin"})
payload = TokenService.decode_token(token)
```

Comprehensive token management:

- **create_access_token()**: Generates short-lived access tokens
- **create_refresh_token()**: Creates long-lived refresh tokens
- **decode_token()**: Safely decodes and validates JWT tokens
- **verify_token()**: Performs comprehensive token verification
- **extract_payload()**: Securely extracts token data
- **is_token_expired()**: Checks token expiration status

---

# 🚀 How to use

```python
from app.elemental.security.password import get_password_hash, verify_password
from app.elemental.security.roles import ElementalRoleChecker
from app.elemental.security.tokens import TokenService

# User registration
password = "SecurePassword123!"
hashed_password = get_password_hash(password)

# User login
if verify_password(password, hashed_password):
    # Create tokens
    access_token = TokenService.create_access_token({
        "user_id": 1,
        "role": "admin",
        "permissions": ["read", "write", "delete"]
    })
    refresh_token = TokenService.create_refresh_token({"user_id": 1})

# Protected route access
try:
    payload = TokenService.decode_token(access_token)
    ElementalRoleChecker.require_role(payload, "admin")
    # Process authenticated request
except (TokenExpiredError, ForbiddenError) as e:
    # Handle authentication failure
    pass
```

---

# 🔧 Configuration

This module integrates with the globl configuration system(settings) for JWT secret keys and algorithms, token expiration times, Password hashing parameters and role hierarchy definitions.

Ensure your `settings,py` includes:

```python
JWT_SECRET_KEY = "your-secret-key"
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
```

---
