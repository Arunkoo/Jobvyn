# Auth Service – Jobvyn

Authentication and Identity Service for the Jobvyn platform.

This service handles secure user onboarding, authentication, and password recovery.  
It integrates with external services for resume uploads and email notifications, following a microservice-ready and production-focused architecture.

---

##  What This Service Does

- Registers **Jobseekers** and **Recruiters**
- Secure login using **JWT Authentication**
- Resume upload via dedicated Upload Service
- Password reset with Redis-backed secure token validation
- Asynchronous email triggering using event publishing
- Automatic and safe database initialization

---

##  Core Application Flow

### 1️ Registration

- Validates required fields
- Hashes password using bcrypt
- If role is `jobseeker` → uploads resume via Upload Service
- Stores user in PostgreSQL
- Returns JWT token

---

### 2️ Login

- Validates email & password
- Compares hashed password
- Fetches associated skills
- Returns authenticated JWT token

---

### 3️ Forgot Password

- Generates short-lived reset token (10 minutes)
- Stores token in Redis (prevents reuse)
- Publishes event to Mail Service
- Sends reset link to frontend

---

### 4️ Reset Password

- Verifies JWT reset token
- Validates Redis-stored token
- Hashes new password
- Deletes token after successful reset (one-time use)

---

##  Service Integrations

- **Upload Service** → Handles resume storage
- **Mail Service (Event-Driven)** → Sends password reset emails
- **Redis** → Temporary secure token storage
- **PostgreSQL** → Persistent user data storage

---

##  Architecture Principles

- Stateless JWT-based authentication
- Secure password hashing
- Redis-backed token invalidation
- Event-driven communication between services
- Clean controller separation
- Structured error handling

---

##  Database Design

<img src="./docs/UserSchema1.png" alt="Auth Service ER Diagram" width="700"/>

##  Tech Stack Used

**Backend**

- Node.js
- Express.js
- TypeScript

**Database**

- PostgreSQL

**Caching / Security**

- Redis
- JWT (jsonwebtoken)
- bcrypt

**File Handling**

- Multer
- Axios (Service-to-Service Communication)

**Architecture**

- Event-Driven Messaging (Producer-based mail trigger)
- Microservice-Oriented Design
- Docker-ready environment

---

##  Environment Variables

```
PORT=
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
UPLOAD_SERVICE_URL=
FRONTEND_URL=
```

---

##  Running Locally

```bash
npm install
npm run dev
```

---

---

**Author:** Arun Kumar
