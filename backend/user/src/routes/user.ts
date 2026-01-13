import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getUserProfile, myProfile } from "../controller/user.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated, myProfile);
userRoutes.get("/:userId", isAuthenticated, getUserProfile);
export default userRoutes;
