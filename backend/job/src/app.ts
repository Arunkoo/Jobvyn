import express from "express";
import jobRouter from "./routes/job.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/job", jobRouter);

export default app;
