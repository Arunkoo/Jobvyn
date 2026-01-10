import express from "express";
import uploadFile from "../middleware/multer.js";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controller/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", uploadFile, registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/forgotPassword", forgotPassword);

//router for reset it include token...
authRoutes.post("/reset/:token", resetPassword);
export default authRoutes;
