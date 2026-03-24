import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variables: ${key}`);
  }

  return value;
}

export const env = {
  PORT: Number(getEnv("PORT", "5000")),
  NODE_ENV: getEnv("Node_ENV", "development"),
  AUTH_SERVICE_URL: getEnv("AUTH_SERVICE_URL", "http://localhost:4001"),
  USER_SERVICE_URL: getEnv("USER_SERVICE_URL", "http://localhost:4002"),
  JOB_SERVICE_URL: getEnv("JOB_SERVICE_URL", "http://localhost:4003"),
  UTILS_SERVICE_URL: getEnv("UTILS_SERVICE_URL", "http://localhost:4004"),
  PAYMENT_SERVICE_URL: getEnv("PAYMENT_SERVICE_URL", "http://localhost:4005"),
};
