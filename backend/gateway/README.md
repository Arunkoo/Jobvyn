# Gateway Service

The API Gateway is the single entry point for all client requests in the Jobvyn platform. It handles routing, request tracing, logging, and rate limiting before forwarding traffic to the appropriate downstream microservice.

## Responsibilities

- Route incoming requests to the correct microservice based on URL prefix
- Stamp every request with a unique `x-request-id` header
- Apply IP-based rate limiting via Redis
- Provide a `/health` endpoint that includes Redis connectivity status
- Forward the original request path and headers to downstream services

## Service Registry

| Prefix | Service | Default Target |
|---|---|---|
| `/api/auth` | Auth Service | `http://localhost:5001` |
| `/api/user` | User Service | `http://localhost:5002` |
| `/api/job` | Job Service | `http://localhost:5003` |
| `/api/utils` | Utils Service | `http://localhost:5004` |
| `/api/payment` | Payment Service | `http://localhost:5005` |

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express 5
- **Proxy**: http-proxy-middleware
- **Rate limiting**: Redis (`redis` v5)
- **Language**: TypeScript 5

## Getting Started

### Prerequisites

- Node.js 18+
- A running Redis instance

### Install & run

```bash
# Install dependencies
npm install

# Development (watch mode)
npm run dev

# Build
npm run build

# Production
npm start
```

### Environment Variables

Create a `.env` file in this directory:

```env
PORT=5000
NODE_ENV=development

AUTH_SERVICE_URL=http://localhost:5001
USER_SERVICE_URL=http://localhost:5002
JOB_SERVICE_URL=http://localhost:5003
UTILS_SERVICE_URL=http://localhost:5004
PAYMENT_SERVICE_URL=http://localhost:5005

REDIS_URL=redis://localhost:6379
RATE_LIMIT_WINDOW_SEC=60
RATE_LIMIT_MAX_REQUESTS=100
```

## API

### Health Check

```
GET /health
```

```json
{
  "success": true,
  "service": "gateway",
  "message": "Gateway is running",
  "timestamp": "2026-03-31T10:00:00.000Z",
  "redis": "up"
}
```

## Rate Limiting

Requests are rate-limited per IP using Redis.

- Window and max requests are configurable via `RATE_LIMIT_WINDOW_SEC` and `RATE_LIMIT_MAX_REQUESTS`.
- Rate limit info is returned in response headers:
  - `X-RateLimit-[LIMIT]`
  - `X-RateLimit-[Remaining]`
  - `X-RateLimit-[RESET]`
- If Redis is unavailable, the middleware fails open (requests are not blocked).
- Exceeding the limit returns `429 Too Many Requests`.

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Strict env loader
│   ├── redis.ts        # Redis client
│   └── service.ts      # Service registry
├── middlewares/
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   ├── rateLimit.middleware.ts
│   └── requestId.middleware.ts
├── proxy/
│   └── createServiceProxy.ts  # Proxy factory with path rewrite and tracing
├── routes/
│   ├── gateway.routes.ts      # Mounts all service proxies
│   └── health.routes.ts
├── app.ts
└── index.ts
```
