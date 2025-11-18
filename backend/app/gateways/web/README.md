# 🌐  Web Gateway Module

This module serves as the FastAPI web gateway for applications, providing a complete HTTP server setup with automatic router discovery, middleware stack, authentication system, and application lifecycle management. It acts as the main entry point for all HTTP request and API endpoints.

## 📁 Folder Structure

```bash
|-- create_app.py
|-- __init__.py
|
|-- auth/
|   |-- __init__.py
|   |-- dependencies.py
|   |-- jwt_bearer.py
|
|-- lifespan/
|   |-- __init__.py
|   |-- lifespan.py
|
|-- middlewares/
|   |-- __init__.py
|   |-- cors.py
|   |-- exceptions.py
|   |-- logging.py
|   |-- session.py
|
|-- routers/
|   |-- __init__.py
|   |-- src_routers.py
```

---

## 📁 `auth/`

### `jwt_bearer.py`

Implements JWT Bearer token authentication for FastAPI routes.

```python
class JWTBearer(HTTPBearer):
    """
    Custom JWT Bearer authentication that:
    - Validates JWT token format and signature
    - Checks token expiration
    - Extracts user information from token payload
    """
```

This module offers features such as automatic token validation on protected routes, seamless integration with FastAPI’s dependency injection system, and support for both access and refresh tokens. It also includes graceful error handling to manage scenarios involving invalid or expired tokens.

---

### `dependencies.py`

Provides dependency functions for extracting authenticated user context.

```python
async def get_current_user(token: str = Depends(JWTBearer())):
    """Extract user information from JWT token."""

async def require_role(required_roles: list[str]):
    """Create dependency that enforces role-based access."""

async def get_user_permissions(token: str = Depends(JWTBearer())):
    """Extract user permissions from token for fine-grained access control."""
```

---

## 📁 `lifespan/`

### `lifespan.py`

Manages application startup and shutdown events for resource initialization and cleanup.
The application handles lifecycle events by performing essential operations during startup and shutdown phases. On startup, it establishes database connections, initializes caches, and runs health checks to ensure system readiness. During shutdown, it gracefully cleans up connections, completes any pending tasks, and disposes of resources properly.

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager that handles:
    - Database connection pool initialization
    - Cache system setup
    - External service connections
    - Graceful shutdown and resource cleanup
    """
```

---

## 📁 `middlewares/`

### `logging.py`

HTTP request/response logging middleware with performance metrics.

```python
class LoggingMiddleware:
    """
    Logs all HTTP requests with:
    - Request method, path, and headers
    - Response status and execution time
    - Error details for failed requests
    """
```

---

### `cors.py`

Cross-Origin Resource Sharing (CORS) configuration for web clients.

```python
def setup_cors_middleware(app: FastAPI):
    """
    Configures CORS with settings from application config:
    - Allowed origins, methods, and headers
    - Credential handling for authenticated requests
    - Preflight request optimization
    """
```

---

### `exceptions.py`

Global exception handling with structured error responses.

```python
class GlobalExceptionHandler:
    """
    Handles all unhandled exceptions with:
    - Structured JSON error responses
    - Appropriate HTTP status codes
    - Error logging and monitoring integration
    """
```

---

### `session.py`

Session management middleware for stateful interactions.

```python
def setup_session_middleware(app: FastAPI):
    """
    Adds session support with:
    - Secure cookie-based sessions
    - Session data encryption
    - Configurable session timeout
    """
```

---

## 📁 `routers/`

### `src_routers.py`

Automatic API router discovery and registration system.

```python
def register_src_routers(app: FastAPI):
    """
    Dynamically discovers and registers routers from:
    app/src/{module}/interfaces/api/router.py

    Convention: Each module should export 'router' variable
    """
```

The system includes a module scanning mechanism that iterates through all packages in `app.src`, detecting routers defined in `interfaces.api.router` within each module. Discovered routers are automatically registered to the main FastAPI application. If a module lacks an API interface, the system logs a warning, ensuring robust error handling during the registration process.

---

## `create_app.py`

The application factory that orchestrates the complete FastAPI application setup.

```python
def create_app() -> FastAPI:
    """
    Creates and configures a FastAPI application instance with:
    - Automatic router discovery and registration
    - Middleware stack setup
    - Authentication system integration
    - Lifecycle event handlers
    """
```

Configuration Process:

- **App Initialization**: Creates FastAPI instance with metadata from settings
- **Middleware Registration**: Adds CORS, logging, session, and exception handling
- **Router Discovery**: Automatically finds and registers API routers from modules
- **Lifespan Integration**: Attaches startup/shutdown event handlers
- **Authentication Setup**: Configures JWT-based security dependencies
