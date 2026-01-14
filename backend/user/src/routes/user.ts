import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getUserProfile,
  myProfile,
  updateUserProfile,
} from "../controller/user.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated, myProfile);
userRoutes.get("/:userId", isAuthenticated, getUserProfile);
userRoutes.put("/update/profile", isAuthenticated, updateUserProfile);
export default userRoutes;
