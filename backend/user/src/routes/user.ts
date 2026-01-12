import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { myProfile } from "../controller/user.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated, myProfile);
export default userRoutes;
