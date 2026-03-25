import { Router } from "express";
import { timeStamp } from "node:console";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "gateway",
    message: "Gateway is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
