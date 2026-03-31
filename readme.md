# JobVyn

A distributed recruitment platform built with a microservices architecture — designed to simulate production-grade backend engineering.

---

<img src="./docs/jobvyn1.png" alt="System Architecture" width="700"/>

---

## What it does

JobVyn connects **Recruiters** and **Candidates** through a subscription-based model. Recruiters post jobs under companies, candidates activate subscriptions and apply — all backed by event-driven workflows and AI-powered utilities.

All traffic flows through a central **API Gateway** that handles routing, rate limiting, and request tracing before reaching any service.

---

## Services

| Service | Role |
|---|---|
| API Gateway | Single entry point — routing, rate limiting, request tracing |
| Auth | JWT-based authentication and role management |
| User | Profiles, subscriptions, applications |
| Job | Company and job lifecycle management |
| Payment | Razorpay verification and subscription activation |
| Utils | Async event processing, AI resume analysis, career guidance |

---

## Stack

**Backend** — Node.js, Express, PostgreSQL, Redis, Kafka, Docker, AWS EC2, GitHub Actions CI/CD

**Frontend** — Next.js, TypeScript, Tailwind CSS, shadcn/ui

**Integrations** — Razorpay, Gemini API, JWT

---

<img src="./docs/jobvyn2.png" alt="ER Diagram" width="700"/>

---

Arun Kumar — Backend Engineer
