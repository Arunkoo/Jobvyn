import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import { requestIdMiddleware } from "./middlewares/requestId.middleware.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import gatewayRoutes from "./routes/gateway.routes.js";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.middleware.js";
const app = express();
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestIdMiddleware);
app.use(loggerMiddleware);
app.use(rateLimitMiddleware);

app.use("/", healthRoutes);
app.use("/", gatewayRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
