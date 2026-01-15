import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getUserProfile,
  myProfile,
  updateProfilePic,
  updateUserProfile,
} from "../controller/user.js";
import uploadFile from "../middleware/multer.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated, myProfile);
userRoutes.get("/:userId", isAuthenticated, getUserProfile);
userRoutes.put("/update/profile", isAuthenticated, updateUserProfile);
userRoutes.post(
  "/update/profile_pic",
  isAuthenticated,
  uploadFile,
  updateProfilePic
);
export default userRoutes;
0;
