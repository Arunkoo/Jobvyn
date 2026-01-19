import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import uploadFile from "../middleware/multer.js";
import {
  createCompany,
  createJob,
  deleteCompany,
  getAllCompany,
  getCompanyDetails,
  updateJob,
} from "../controller/job.js";

const jobRouter = express.Router();

jobRouter.post("/company/new", isAuthenticated, uploadFile, createCompany);
jobRouter.delete("/company/:companyId", isAuthenticated, deleteCompany);
jobRouter.post("/new", isAuthenticated, createJob);
jobRouter.put("/update/:jobId", isAuthenticated, updateJob);
jobRouter.get("/company/all", isAuthenticated, getAllCompany);
jobRouter.get("/company/:companyId", isAuthenticated, getCompanyDetails);
export default jobRouter;
