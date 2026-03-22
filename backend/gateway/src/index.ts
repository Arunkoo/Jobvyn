import express from "express";

const app = express();

app.use(express.json());

// async function start(): Promise<void> {}

app.listen(8080, () => {
  console.log(`[Gateway] Running on port ${GATEWAY_CONFIG.port}`);
});
