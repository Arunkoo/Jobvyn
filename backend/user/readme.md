# User Service – Jobvyn

The User Service handles user profile management and job application workflows for the Jobvyn platform.  
It provides secure endpoints for profile retrieval, updates, resume and profile picture uploads, skill management, and job applications.

---

## Functionality Overview

- **Profile Management**
  - Fetch authenticated user profile (`/me`)
  - Fetch other users’ profiles (`/:userId`)
  - Update user details (`/update/profile`)
  - Upload/update profile picture and resume (`/update/profile_pic`, `/update/resume`)

- **Skill Management**
  - Add skills to user profile (`/skill/add`)
  - Delete skills from user profile (`/skill/delete`)

- **Job Applications**
  - Apply for a job (`/apply/job`)
  - Get all applications by the user (`/application/all`)

---

## Core Service Flow

1. **Authentication Required** for all routes via JWT.
2. **Profile Updates** support partial updates and integrate with Upload Service for files.
3. **Skills** are normalized and linked via `user_skills` mapping to avoid duplicates.
4. **Job Applications** validate active jobs, user subscription status, and prevent duplicate applications.

---

## Service Integrations

- **Upload Service** – Handles profile picture and resume uploads
- **Auth Service** – Provides user authentication and JWT validation
- **PostgreSQL** – Stores user, skills, and application data

---

## Environment Variables

```
PORT=
DATABASE_URL=
UPLOAD_SERVICE_URL=
JWT_SECRET=
```

---

## Running Locally

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:${PORT}/api/user
```

---

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Axios** (Service-to-Service Communication)
- **JWT**
- **Multer** (File Upload Handling)
- **Structured SQL Queries**

---

**Author:** Arun Kumar  
Backend Developer | Node.js | System Design Enthusiast
