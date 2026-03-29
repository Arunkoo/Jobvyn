import { createClient } from "redis";
import { env } from "./env.js";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("connect", () => {
  console.log("Redis service is ready");
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
