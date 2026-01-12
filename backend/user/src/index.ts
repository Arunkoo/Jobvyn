import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5002;

app.use("/api/user", userRoutes);
app.listen(PORT, () => {
  console.log(`User service is running at http://localhost:${PORT}`);
});
