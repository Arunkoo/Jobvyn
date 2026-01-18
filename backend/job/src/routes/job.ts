import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import uploadFile from "../middleware/multer.js";
import { createCompany, createJob, deleteCompany } from "../controller/job.js";

const jobRouter = express.Router();

jobRouter.post("/company/new", isAuthenticated, uploadFile, createCompany);
jobRouter.delete("/company/:companyId", isAuthenticated, deleteCompany);
jobRouter.post("/new", isAuthenticated, createJob);
export default jobRouter;
