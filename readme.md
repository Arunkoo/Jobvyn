# JobVyn

> A production-grade recruitment platform built with microservices, event-driven architecture, and AI — deployed on AWS EC2 with full CI/CD automation.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-231F20?style=flat&logo=apachekafka&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&logo=amazonaws&logoColor=white)
![CI/CD](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

---

## What is JobVyn?

JobVyn connects **Recruiters** and **Candidates** through a subscription-based hiring platform. Recruiters post jobs under verified companies. Candidates subscribe and apply — triggering async workflows for resume processing, email notifications, and AI-powered career insights.

Built to go beyond a typical CRUD app — every architectural decision reflects real engineering tradeoffs.

---

## System Architecture

<img src="./docs/jobvyn1.png" alt="System Architecture" width="700"/>

All traffic enters through a central **API Gateway** that handles routing, JWT verification, rate limiting (Redis), and unique request tracing (UUID) before any service is touched.

---

## Services

| Service | Responsibility | Key Tech |
|---|---|---|
| **Gateway** | Single entry point — routing, rate limiting, request tracing | Express, Redis, http-proxy-middleware |
| **Auth** | Registration, login, JWT issuance, role management | JWT, bcrypt, Kafka producer |
| **User** | Candidate profiles, subscriptions, job applications | PostgreSQL, Redis cache |
| **Job** | Company creation, job posting lifecycle | PostgreSQL, Kafka producer |
| **Payment** | Razorpay webhook verification, subscription activation | Razorpay, PostgreSQL |
| **Utils** | Async event consumer — email delivery, AI resume analysis, career guidance | Kafka consumer, Gemini API, Nodemailer, Cloudinary |

---

## Engineering Highlights

**Event-driven with Kafka** — Auth, Job, and User services produce events. The Utils service consumes them asynchronously, keeping services decoupled and non-blocking.

**Redis for rate limiting and caching** — The gateway enforces per-IP rate limits. User service caches frequently read profile data to reduce DB load.

**AI integration** — The Utils service calls Google Gemini API to analyse uploaded resumes and generate personalised career guidance for candidates.

**JWT with role-based access** — Tokens carry role claims (recruiter/candidate). The gateway validates and forwards identity context so downstream services never re-verify.

**Containerised and deployed** — Every service ships as a Docker image, built and pushed to Docker Hub via GitHub Actions on every push to `main`, then pulled and restarted on AWS EC2.

---

## Tech Stack

**Backend** — Node.js, TypeScript, Express 5, PostgreSQL (Neon), Redis, KafkaJS

**Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix UI)

**Infrastructure** — Docker, AWS EC2, GitHub Actions CI/CD, Docker Hub

**Integrations** — Razorpay, Google Gemini API, Cloudinary, Nodemailer, JWT

---

## Job Page

<img src="./docs/jobvyn2.png" alt="Job Page" width="700"/>

---

## Project Structure

```
jobvyn/
├── backend/
│   ├── gateway/       # API Gateway — routing, rate limiting, tracing
│   ├── auth/          # Authentication & JWT
│   ├── user/          # Profiles, subscriptions, applications
│   ├── job/           # Companies & job listings
│   ├── payment/       # Razorpay payment handling
│   └── utils/         # Async consumer — AI, email, file storage
└── frontend/          # Next.js candidate & recruiter UI
```

---

## CI/CD Pipeline

Push to `main` → GitHub Actions builds Docker images for all 6 services → pushes to Docker Hub → SSH into AWS EC2 → pulls latest images → restarts containers.

Zero manual deployment steps.

---

Built by **Arun Kumar** — Backend Engineer
