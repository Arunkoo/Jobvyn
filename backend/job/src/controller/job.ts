//create company ....

import axios from "axios";
import { AuthenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

//create a company...
export const createCompany = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Authentication required");
    }

    if (user.role !== "recruiter") {
      throw new ErrorHandler(
        403,
        "❌ Forbidden: Only recruiter can create a company",
      );
    }

    const { name, description, website } = req.body;
    if (!name || !description || !website) {
      throw new ErrorHandler(400, "Please fill all necessary details");
    }

    //normalization.... for uniquness....
    const normalizedName = name.trim().toLowerCase();

    const existingCompany = await sql`
        SELECT company_id FROM companies WHERE name = ${normalizedName}
    `;

    if (existingCompany.length > 0) {
      throw new ErrorHandler(
        409,
        `A company with this name ${normalizedName} already exists`,
      );
      return;
    }

    //i need company logo...
    const file = req.file;

    if (!file) {
      throw new ErrorHandler(400, "Company logo file is required");
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new ErrorHandler(500, "Failed to generate 'Buffer'");
    }

    //call upload_service....
    const { data } = await axios.post(
      `${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`,
      { buffer: fileBuffer.content },
    );

    //save data...
    const [newCompany] = await sql`
        INSERT INTO companies (
            name,
            description,
            website,
            logo,
            logo_public_id,
            recruiter_id
        ) VALUES (
            ${normalizedName},
            ${description},
            ${website},
            ${data.url},
            ${data.public_id},
            ${user.user_id}
        ) RETURNING *;
    `;

    res.json({
      message: "✅ Company created successfully",
      newCompany,
    });
  },
);

//delete a company...
export const deleteCompany = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user; //why?we need user to delete company  because only recuriter can delete a company....
    const { companyId } = req.params;

    const [company] = await sql`
      SELECT logo_public_id FROM companies WHERE company_id = ${companyId} AND recruiter_id = ${user?.user_id}
    `;

    if (!company) {
      throw new ErrorHandler(
        404,
        "❌ Company not found or you're not authorized to delete it.",
      );
    }

    await sql`DELETE FROM companies WHERE company_id = ${companyId}`;

    res.json({
      message: "✅ Company and all associated jobs have been deleted",
    });
  },
);

//create a Job...
export const createJob = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Authenticated required");
    }

    if (user.role !== "recruiter") {
      throw new ErrorHandler(
        403,
        "❌ Forbidden: Only recruiter can create a company",
      );
    }

    const {
      title,
      description,
      salary,
      location,
      role,
      job_type,
      work_location,
      company_id,
      openings,
    } = req.body;

    if (!title || !description || !salary || !location || !role || !openings) {
      throw new ErrorHandler(400, "❌ All the fields are required");
    }

    const [company] = await sql`
      SELECT company_id FROM companies WHERE company_id = ${company_id} AND recruiter_id = ${user.user_id}
    `;

    if (!company) {
      throw new ErrorHandler(404, "Company not found");
    }

    const [newJob] = await sql`
      INSERT INTO jobs (title, description, salary, location, role, job_type, work_location, company_id, posted_by_recruiter_id, openings)
      VALUES (${title}, ${description}, ${salary}, ${location}, ${role}, ${job_type}, ${work_location}, ${company_id}, ${user.user_id}, ${openings}) RETURNING *;
    `;

    res.json({
      message: "✅ Job created successfully",
      job: newJob,
    });
  },
);
