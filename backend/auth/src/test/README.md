# Auth Service — Tests

Unit and integration tests for the `auth` microservice controllers, written with Jest and TypeScript.

## Directory Structure

```
src/test/
├── setup.ts                        # Global test setup (env vars, console silencing)
├── helpers/
│   └── mockSetup.ts                # Shared mock factories (request, response, next)
├── unit/
│   ├── loginUser.unit.test.ts      # Tests for loginUser controller
│   └── registerUser.unit.test.ts   # Tests for registerUser controller
└── integration/
    └── auth.integration.test.ts    # Integration tests for auth routes via supertest
```

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Watch mode
npm run test:watch
```

## Test Coverage

### `loginUser`

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Email is missing | `400` — missing details |
| 2 | Password is missing | `400` — missing details, `sql` not called |
| 3 | User not found in DB | `400` — invalid credentials |
| 4 | Password does not match | `400` — invalid credentials |
| 5 | Valid credentials | `200` — JWT token in response |
| 6 | Successful login | Password omitted from response object |
| 7 | User has `null` skills in DB | `skills` normalized to `[]` in response |

### `registerUser`

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Required fields missing | `400` — validation error |
| 2 | Email already registered | `409` — duplicate user |
| 3 | Recruiter registration | `201` — JWT token returned |
| 4 | Jobseeker with no file uploaded | `400` — resume required |
| 5 | File uploaded but buffer generation fails | `500` — buffer error |
| 6 | Jobseeker with valid resume | `201` — JWT token returned |

### `POST /api/auth/register` (Integration)

| # | Scenario | Expected |
|---|----------|----------|
| 1 | Required fields missing | `400` — all details required message |
| 2 | Email already registered | `409` — user with this email already exists |
| 3 | Recruiter registration | `201` — success true, JWT token in response |

> Integration tests hit the real Express app via `supertest`. External dependencies (DB, Kafka, Redis, axios) are still mocked at the module level to keep tests isolated and fast.

## Mocks

All external dependencies are mocked at the top of each test file before imports, following Jest's hoisting requirements.

| Module | Mocked As |
|--------|-----------|
| `utils/db.ts` | `sql` → `jest.fn()` |
| `producer.ts` | `connectKafka`, `publishToTopic`, `disconnectKafka` → `jest.fn()` |
| `index.ts` | `redisClient.get/set/del` → `jest.fn()` |
| `utils/buffer.js` | `getBuffer` → `jest.fn()` |
| `axios` | `axios.post` → `jest.fn()` |

## Helpers

**`mockSetup.ts`** exports three utilities used across all unit tests:

- `mockRequest(body?, params?, file?)` — builds a partial Express `Request`
- `mockResponse()` — builds a partial Express `Response` with jest-spied `status` and `json`
- `mockNext` — a `jest.fn()` standing in for Express `NextFunction`

## Setup

**`setup.ts`** runs before every test suite and:

- Sets required environment variables (`JWT_SECRET`, `FRONTEND_URL`, `UPLOAD_SERVICE_URL`)
- Silences `console.log` and `console.error` to keep test output clean
