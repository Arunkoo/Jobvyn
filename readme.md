# JobVyn

A distributed recruitment platform built with a service-oriented architecture, subscription-based access control, and AI-powered utilities.

Designed to demonstrate real-world backend engineering: API gateway, authentication, relational data modeling, event-driven workflows, payment verification, and containerized deployment with GitHub Actions CI/CD.

---

<img src="./docs/jobvyn1.png" alt="System Architecture Diagram" width="700"/>

---

## Overview

JobVyn is a multi-service recruitment system where Recruiters post jobs and Candidates apply through a subscription model.

The architecture separates concerns into independent services communicating via REST and Kafka, with a central API Gateway handling all inbound traffic. This simulates production-grade backend systems rather than a monolithic demo project.

**Core focus areas:**

- Central API gateway with rate limiting and request tracing
- Clean service boundaries with isolated deployments
- Secure role-based access control
- Event-driven background processing
- Structured AI integration
- Cloud-ready containerized deployment

<img src="./docs/jobvyn2.png" alt="ER Diagram" width="700"/>

---

## Tech Stack

### Backend

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express |
| Database | PostgreSQL |
| Message Broker | Kafka |
| Gateway Cache | Redis |
| Auth | JWT |
| Payments | Razorpay |
| AI | Gemini API |
| Containerization | Docker |
| Hosting | AWS EC2 |
| CI/CD | GitHub Actions |

### Frontend

| Layer | Technology |
|---|---|
| Framework | Next.js + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |

---

## Architecture

All client requests enter through a single **API Gateway** (port `8001`) which proxies them to the appropriate downstream service.

```
Client
  │
  ▼
API Gateway (:8001)
  ├── /api/auth     →  Auth Service    (:5001)
  ├── /api/user     →  User Service    (:5002)
  ├── /api/job      →  Job Service     (:5003)
  ├── /api/utils    →  Utils Service   (:5004)
  └── /api/payment  →  Payment Service (:5005)
```

### Services

| Service | Responsibility |
|---|---|
| **API Gateway** | Central entry point — routing, rate limiting, request tracing |
| **Auth Service** | Authentication, JWT issuance, role management |
| **User Service** | Profiles, subscriptions, job applications |
| **Job Service** | Company creation, job lifecycle management |
| **Payment Service** | Payment verification, subscription activation |
| **Utility Service** | Async event processing, AI-powered features |
| **Kafka Broker** | Non-blocking background workflows (e.g., email notifications) |

Each service is isolated, containerized, and environment-configured for deployment.

---

## API Gateway

The gateway is the single entry point for the entire platform. It handles cross-cutting concerns so individual services stay focused on business logic.

### Features

**Request Tracing**
- Assigns a unique `x-request-id` (UUID v4) to every request
- Propagates the ID downstream to all services
- Logs request start, response status, and total duration per request

**Redis-based Rate Limiting**
- IP-based sliding window strategy
- Default: 100 requests per 60-second window
- Returns `HTTP 429` with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers
- Graceful fallback — if Redis is unavailable, requests pass through

**Reverse Proxy**
- Routes traffic to 5 downstream services via `http-proxy-middleware`
- 10-second proxy timeout
- Stamps outgoing requests with `x-gateway-service: gateway`
- Stamps responses with `x-proxied-service: {serviceName}`
- Forwards `X-Forwarded-*` headers for accurate IP detection

**Centralized Error Handling**
- `502 Bad Gateway` on proxy failures with socket cleanup
- `404 Not Found` for unmatched routes
- `500 Internal Server Error` for unhandled exceptions

**Middleware Stack (in order)**

```
requestIdMiddleware  →  loggerMiddleware  →  rateLimitMiddleware
     →  serviceProxy  →  notFoundMiddleware  →  errorMiddleware
```

---

## Key Capabilities

- Role-based authentication (Recruiter / Candidate)
- Subscription-gated job applications
- Company and job management workflows
- Duplicate application prevention
- Event-driven email notifications via Kafka
- AI-powered resume analysis (structured output)
- AI-based career guidance generation
- Dockerized multi-service deployment on AWS EC2
- Automated CI/CD pipeline via GitHub Actions

---

## System Flow

```
1. Request hits the API Gateway
2. Gateway assigns a request ID and logs the request
3. Rate limiter checks the IP against Redis
4. Request is proxied to the target service
5. Response is logged with status and duration
```

**Application flow:**

1. User authenticates → receives JWT
2. Recruiter posts jobs under a company
3. Candidate activates subscription via Razorpay
4. Application triggers a Kafka event
5. Utility service processes the event asynchronously
6. AI endpoints provide resume scoring and recommendations

---

## Design Principles

- Single entry point via API Gateway for all traffic
- Clear separation of concerns across services
- Server-side validation of all business rules
- Asynchronous processing for scalability
- Structured AI responses for predictable frontend rendering
- Production-oriented deployment strategy

---

## Project Structure

Each service follows a layered structure:

```
routes → controllers → business logic → database access
```

The gateway follows:

```
middleware → proxy factory → service config → error handling
```

---

## Status

- Backend services complete
- API Gateway with Redis rate limiting operational
- Kafka integration operational
- AI features integrated
- Dockerized and deployed on AWS EC2
- CI/CD pipeline active via GitHub Actions

---

Arun Kumar
Backend Engineer | Distributed Systems Focus
