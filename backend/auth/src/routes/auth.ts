import express from "express";
import uploadFile from "../middleware/multer.js";
import { loginUser, registerUser } from "../controller/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", uploadFile, registerUser);
authRoutes.post("/login", loginUser);
export default authRoutes;
