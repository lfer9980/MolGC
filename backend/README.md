# Example Project

This is a sample project created using **BackFrameX**.

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   cd ejemplo_backend
   ```

2. Create and activate the virtual environment with dependencies:

   ```bash
   conda env create -f environment.yml
   conda activate BackFrameX
   ```

---

## 🚀 Usage

Run the application in **web mode**:

```bash
python main.py web
```

> The API will be available at: [http://localhost:8000](http://localhost:8000)

Run the application in **CLI mode**:

```bash
python main.py cli [feature] [service] run [params]
```

---

## 📄 Main Endpoints

| Method | Path                                    | Description                           |
| ------ | --------------------------------------- | ------------------------------------- |
| POST   | `/api/users/v1/public/`                 | Create a new user                     |
| POST   | `/api/users/v1/public/auth`             | Obtain authentication tokens          |
| GET    | `/api/users/v1/private/`                | Retrieve a list of all users          |
| PUT    | `/api/users/v1/private/`                | Update an existing user's details     |
| DELETE | `/api/users/v1/private/{user_id}`       | Delete a user by their ID             |
| GET    | `/api/users/v1/private/{user_id}`       | Retrieve user details                 |
| GET    | `/api/users/v1/private/{user_id}/tasks` | Retrieve tasks associated with a user |
| POST   | `/api/tasks/v1/private/`                | Create a new task                     |
| GET    | `/api/tasks/v1/private/`                | Retrieve a list of all tasks          |
| PUT    | `/api/tasks/v1/private/`                | Update an existing task's details     |
| DELETE | `/api/tasks/v1/private/{task_id}`       | Delete a task by its ID               |

---

## 📁 Folder Structure

```bash
|-- alembic
|-- app
    |-- elemental
    |-- gateways
    |-- infrastructure
    |-- settings
    |-- src
    |-- __init__.py
|-- logs
|-- environment.yml
|-- main.py
|-- pyproject.toml
|-- requirements.txt
|-- settings.dev.toml
```

---

## Folder Descriptions

### alembic

Contains database migration scripts (versioned) and general database configuration.

### app

#### elemental

Contains core utility modules shared across the project, including common schemas (enums, models, value objects), standardized exception schemas and handling, logging utilities for endpoint activity, and a password hashing utility.

#### gateways

This module serves as the controller for CLI mode, acting as the core handler for commands and logging.

#### infrastructure

Includes infrastructure-related components such as database connections, email services, and other external integrations.

#### settings

To do

#### src

Houses the project’s modules implemented using hexagonal architecture, organized into four main layers: domain, application, infrastructure, and interface.

### logs

Contains log files generated from activities performed in both web and CLI modes.
