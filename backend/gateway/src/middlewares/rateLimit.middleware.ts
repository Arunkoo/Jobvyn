import { NextFunction, Request, Response } from "express";
import { redisClient } from "../config/redis.js";
import { env } from "../config/env.js";

export async function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const key = `rate_limit:${ip}`;

    const currentRequest = await redisClient.incr(key);

    if (currentRequest === 1) {
      await redisClient.expire(key, env.RATE_LIMIT_WINDOW_SEC);
    }

    const ttl = await redisClient.ttl(key);
    const remaining = Math.max(env.RATE_LIMIT_MAX_REQUESTS - currentRequest, 0);

    res.setHeader("X-RateLimit-limit", env.RATE_LIMIT_MAX_REQUESTS);
    res.setHeader("X-RateLimit-remaining", remaining);
    res.setHeader("X-RateLimit-ttl", ttl);

    // edge check...
    if (currentRequest > env.RATE_LIMIT_MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later.",
        requestId: req.requestId,
      });
    }

    next();
  } catch (error) {
    console.error("[RATE LIMIT ERROR]", error);
    next(); //why? next() if things fails because if redis fails, req still goes through..
  }
}
