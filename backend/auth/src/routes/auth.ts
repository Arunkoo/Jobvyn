import express from "express";
import registerUser from "../controller/auth.js";
import uploadFile from "../middleware/multer.js";

const authRoutes = express.Router();

authRoutes.post("/register", uploadFile, registerUser);
export default authRoutes;
