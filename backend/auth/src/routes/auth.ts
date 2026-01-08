import express from "express";
import uploadFile from "../middleware/multer.js";
import { forgotPassword, loginUser, registerUser } from "../controller/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", uploadFile, registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/forgotPassword", forgotPassword);
export default authRoutes;
