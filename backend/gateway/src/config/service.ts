import { env } from "./env.js";
export interface ServiceConfig {
  name: string;
  prefix: string;
  target: string;
  description: string;
}

/*
 * Service Registry
 * Maps URL prefix → internal service URL.
 */
export const SERVICES: Record<string, ServiceConfig> = {
  auth: {
    name: "auth",
    prefix: "/api/auth",
    target: env.AUTH_SERVICE_URL,
    description: "Authentication service",
  },
  user: {
    name: "user",
    prefix: "/api/user",
    target: env.USER_SERVICE_URL,
    description: "User Mangement service",
  },
  job: {
    name: "job",
    prefix: "/api/job",
    target: env.JOB_SERVICE_URL,
    description: "Job service",
  },
  utils: {
    name: "utils",
    prefix: "/api/utils",
    target: env.UTILS_SERVICE_URL,
    description: "Utils service",
  },
  payment: {
    name: "payment",
    prefix: "/api/payment",
    target: env.PAYMENT_SERVICE_URL,
    description: "payment service",
  },
};

export const GATEWAY_CONFIG = {
  port: parseInt(process.env.PORT ?? "3000", 10),
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",

  //routes that will skip JWT verifications...

  publicRoutes: [
    "/api/auth/login",
    "/api/auth/register",
    "/api/job",
    "/health",
  ],
};
