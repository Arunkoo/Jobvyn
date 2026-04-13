import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
//auth router configured..
app.use("/api/auth", authRoutes);

export default app;
