import express from "express";
import "dotenv/config";
import { GATEWAY_CONFIG } from "./config/service.js";
import cors from "cors";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());

// async function start(): Promise<void> {}

app.listen(8080, () => {
  console.log(`[Gateway] Running on port ${GATEWAY_CONFIG.port}`);
});
