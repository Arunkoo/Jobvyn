import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getUserProfile,
  myProfile,
  updateProfilePic,
  updateResume,
  updateUserProfile,
} from "../controller/user.js";
import uploadFile from "../middleware/multer.js";

const userRoutes = express.Router();

userRoutes.get("/me", isAuthenticated, myProfile);
userRoutes.get("/:userId", isAuthenticated, getUserProfile);
userRoutes.put("/update/profile", isAuthenticated, updateUserProfile);
userRoutes.put(
  "/update/profile_pic",
  isAuthenticated,
  uploadFile,
  updateProfilePic
);
userRoutes.put("/update/resume", isAuthenticated, uploadFile, updateResume);
export default userRoutes;
0;
