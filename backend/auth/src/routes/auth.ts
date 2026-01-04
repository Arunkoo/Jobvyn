import express from "express";
import registerUser from "../controller/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
export default authRoutes;
