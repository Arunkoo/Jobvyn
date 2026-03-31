import app from "./app.js";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";

async function startServer() {
  try {
    await connectRedis();
    app.listen(env.PORT, () => {
      console.log(`Gateway is running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Failed to start gateway:", error);
    process.exit(1);
  }
}

startServer();
