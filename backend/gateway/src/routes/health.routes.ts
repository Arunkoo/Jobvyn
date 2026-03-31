import { Router } from "express";
import { redisClient } from "../config/redis.js";

const router = Router();

router.get("/health", async (req, res) => {
  let redisStatus = "down";
  try {
    const pong = await redisClient.ping();
    if (pong === "PONG") {
      redisStatus = "up";
    }
  } catch {
    redisStatus = "down";
  }
  res.status(200).json({
    success: true,
    service: "gateway",
    message: "Gateway is running",
    timestamp: new Date().toISOString(),
    redis: redisStatus,
  });
});

//temprory route   just for 500 server test.

router.get("/error-test", () => {
  throw new Error("Test error from gateway");
});

export default router;
