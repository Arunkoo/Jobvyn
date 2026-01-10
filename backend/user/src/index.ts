import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`User service is running at http://localhost/${PORT}`);
});
