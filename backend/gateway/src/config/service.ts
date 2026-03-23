export interface ServiceConfig {
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
    prefix: "/api/auth",
    target: process.env.AUTH_SERVICE_URL ?? "http://localhost:4001",
    description: "Authentication service",
  },
  user: {
    prefix: "/api/user",
    target: process.env.USER_SERVICE_URL ?? "http://localhost:4002",
    description: "User Mangement service",
  },
  job: {
    prefix: "/api/job",
    target: process.env.JOB_SERVICE_URL ?? "http://localhost:4003",
    description: "Job service",
  },
  utils: {
    prefix: "/api/utils",
    target: process.env.UTILS_SERVICE_URL ?? "http://localhost:4005",
    description: "Utils service",
  },
  payment: {
    prefix: "/api/payment",
    target: process.env.PAYMENT_SERVICE_URL ?? "http://localhost:4004",
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
