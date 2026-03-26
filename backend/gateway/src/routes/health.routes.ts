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

//temprory route   just for 500 server test.

router.get("/error-test", () => {
  throw new Error("Test error from gateway");
});

export default router;
