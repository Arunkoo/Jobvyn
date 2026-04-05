import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  PORT: Number(getEnv("PORT", "8001")),
  NODE_ENV: getEnv("NODE_ENV", "development"),

  AUTH_SERVICE_URL: getEnv("AUTH_SERVICE_URL", "http://auth:5000"),
  USER_SERVICE_URL: getEnv("USER_SERVICE_URL", "http://user:5002"),
  JOB_SERVICE_URL: getEnv("JOB_SERVICE_URL", "http://job:5003"),
  UTILS_SERVICE_URL: getEnv("UTILS_SERVICE_URL", "http://utils:5001"),
  PAYMENT_SERVICE_URL: getEnv("PAYMENT_SERVICE_URL", "http://payment:5004"),

  REDIS_URL: getEnv("REDIS_URL", "redis://redis:6379"),
  RATE_LIMIT_WINDOW_SEC: Number(getEnv("RATE_LIMIT_WINDOW_SEC", "60")),
  RATE_LIMIT_MAX_REQUESTS: Number(getEnv("RATE_LIMIT_MAX_REQUESTS", "100")),
};
