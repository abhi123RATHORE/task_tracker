# 🚀 Task Tracker (Full Stack)

A full-stack Task Tracker application built as part of a technical assessment. The application allows users to create and manage tasks, track time spent on tasks, update task status, and view summary statistics. The project consists of a Spring Boot REST API backend and a React frontend.

---

# 📌 Tech Stack

## Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Maven
- Lombok
- Bean Validation

## Frontend
- React
- Vite
- Material UI
- React Router
- Axios

---

# ✨ Features

## Task Management

- Create Task
- View All Tasks
- View Single Task
- Update Task
- Delete Task
- Filter by Status
- Filter by Priority
- Update Task Status

## Time Tracking

- Add Time Entry
- View Time Entries
- Summary API
- Total Time per Task
- Overall Logged Time

---

# 📂 Project Structure

```
Task-Tracker
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
└── frontend
    ├── src
    ├── package.json
    └── vite.config.js
```

---

# ⚙️ Backend Setup

## Prerequisites

- Java 17+
- Maven
- PostgreSQL

## Clone Repository

```bash
git clone <repository-url>
```

Navigate to backend

```bash
cd backend
```

Configure the database in `application.properties` (or use environment variables):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_tracker
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Build the project

```bash
mvn clean install
```

Run the application

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

# 💻 Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:8080/api
```

Run the application

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Ensure the backend is running before starting the frontend.

---

# 📡 API Endpoints

## Tasks

| Method | Endpoint |
|---------|----------|
| POST | `/api/tasks` |
| GET | `/api/tasks` |
| GET | `/api/tasks/{id}` |
| PUT | `/api/tasks/{id}` |
| DELETE | `/api/tasks/{id}` |
| PATCH | `/api/tasks/{id}/status` |

## Time Entries

| Method | Endpoint |
|---------|----------|
| POST | `/api/tasks/{taskId}/time-entries` |
| GET | `/api/tasks/{taskId}/time-entries` |

## Summary

| Method | Endpoint |
|---------|----------|
| GET | `/api/summary` |

---

# ✅ Business Rules

- Tasks must follow the status flow:

```
TODO → IN_PROGRESS → DONE
```

- Direct transition from **TODO** to **DONE** is not allowed.
- A task cannot be deleted if it has associated time entries.
- Time entry duration must be greater than **0** minutes.
- A single time entry cannot exceed **480 minutes (8 hours)**.
- Invalid requests return appropriate **400**, **404**, or **409** HTTP responses with consistent JSON error messages.

---

# 🏗️ Design Decisions

- Followed a layered architecture (Controller → Service → Repository) to separate concerns.
- Used DTOs to decouple API models from database entities.
- Implemented centralized exception handling using `@RestControllerAdvice`.
- Applied Bean Validation for request validation and enforced business rules in the service layer.
- Structured the React frontend into reusable components, pages, and service modules to improve maintainability.
- Used Axios to centralize API communication and React Router for navigation.

---

# ⚖️ Trade-offs

The primary focus was implementing all required assessment features while keeping the codebase clean and maintainable. Due to time constraints, advanced features such as authentication, authorization, pagination, search, unit/integration testing, Docker support, and CI/CD pipelines were not implemented. Summary calculations are currently performed in the service layer for simplicity; for larger datasets, database-level aggregation would provide better performance. The frontend currently uses browser alerts for user feedback, which can be replaced with Material UI Snackbars in a production-ready version to improve the user experience.

---

# 🤖 AI Usage

AI tools (ChatGPT) were used as a development assistant throughout this project. AI was primarily used to clarify Spring Boot and React concepts, explain framework behavior, troubleshoot errors, review code structure, generate boilerplate code, and improve documentation. It also helped suggest cleaner implementations for validation, exception handling, and component organization. All AI-generated suggestions were carefully reviewed, tested, and modified before being incorporated into the project. The application architecture, business rule implementation, debugging, integration between frontend and backend, and final technical decisions were completed manually to ensure the solution met the assessment requirements and functioned correctly.

---

# 🚀 Future Improvements

- JWT Authentication
- User Management
- Search
- Pagination
- Unit & Integration Tests
- Docker Support
- CI/CD Pipeline
- Deployment (Render/Vercel/Railway)

---

# 👨‍💻 Author

**Abhishek Rathore**

give me full structure
