//create company ....

import axios from "axios";
import { AuthenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import { applicationStatusUpdateTemplate } from "../template.js";
import { publishToTopic } from "../producer.js";

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
      message: "Company created successfully",
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
      message: "Company and all associated jobs have been deleted",
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
      message: "Job created successfully",
      job: newJob,
    });
  },
);

//update a JOb ...  {in -review need to change later...}
export const updateJob = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (user?.role !== "recruiter") {
      throw new ErrorHandler(
        403,
        "Forbidden: Only recruiter can update a job profile",
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
      is_active,
    } = req.body;

    const [existingJob] = await sql`
      SELECT posted_by_recruiter_id FROM jobs WHERE job_id = ${req.params.jobId}
    `;

    if (!existingJob) {
      throw new ErrorHandler(404, "Job not found");
    }

    if (existingJob.posted_by_recruiter_id != user.user_id) {
      throw new ErrorHandler(
        403,
        "Forbidden: Only recruiter associated with this job can update a job profile",
      );
    }

    const [updatedJob] = await sql`
      UPDATE jobs SET
        title = ${title},
        description = ${description},
        salary = ${salary},
        location = ${location},
        role = ${role},
        job_type = ${job_type},
        work_location = ${work_location},
        company_id = ${company_id},
        openings = ${openings},
        is_active = ${is_active}
      WHERE job_id = ${req.params.jobId}
      RETURNING *;
    `;

    res.json({
      message: "✅ Job Updated Successfully!",
      updatedJob,
    });
  },
);

//fetch all companies.....
export const getAllCompany = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const companies =
      await sql`SELECT * FROM companies WHERE recruiter_id = ${req.user?.user_id}`;

    res.json({
      companies,
    });
  },
);

//fetch one company....
export const getCompanyDetails = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const { companyId } = req.params;
    if (!companyId) {
      throw new ErrorHandler(400, "Company id is required");
    }

    //imp query...
    // “Give me the company whose id = ${companyId}, including all its columns, and attach a jobs field that is a JSON array of all jobs belonging to that company.
    // If the company has no jobs, jobs should be an empty array. Return exactly one row.”
    const [companyData] = await sql`SELECT c.*, COALESCE (
        (
          SELECT json_agg(j.*) FROM jobs j WHERE j.company_id = c.company_id
        ),
        '[]'::json
      )AS jobs
      FROM companies c WHERE c.company_id = ${companyId}
      GROUP BY c.company_id;
      `;

    if (!companyData) {
      throw new ErrorHandler(404, "company not found");
    }

    res.json({
      companyData,
    });
  },
);

//fetch all active jobs....
export const getAllActiveJobs = TryCatch(async (req, res, next) => {
  const { title, location } = req.query as {
    title?: string;
    location?: string;
  };
  //NOTE: Give me all active jobs, optionally filtered by title and/or location, sorted by newest first.
  let queryString = `SELECT j.job_id, j.title, j.description, j.salary, j.location, j.job_type, j.role, j.work_location, j.created_at, c.name AS company_name, c.logo AS company_logo, c.company_id AS company_id FROM jobs j JOIN companies c ON j.company_id = c.company_id WHERE j.is_active = true`;

  const values = [];
  let paramIndex = 1;

  if (title) {
    queryString += ` AND j.title ILIKE $${paramIndex}`;
    values.push(`%${title}%`);
    paramIndex++;
  }

  if (location) {
    queryString += ` AND j.location ILIKE $${paramIndex}`;
    values.push(`%${location}%`);
    paramIndex++;
  }

  queryString += " ORDER BY j.created_at DESC";

  const jobs = (await sql.query(queryString, values)) as any;

  res.json(jobs);
});

//fetch onejob....
export const getSingleJob = TryCatch(async (req, res, next) => {
  const [job] = await sql`
    SELECT * FROM jobs WHERE job_id = ${req.params.id}
  `;

  res.json(job);
});

export const getAllApplicationForJob = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "Authentication required");
    }

    if (user.role !== "recruiter") {
      throw new ErrorHandler(
        403,
        "Forbidden: Only recruiter can fetch all application for jobs.",
      );
    }

    const { jobId } = req.params;

    const [job] = await sql`
      SELECT posted_by_recruiter_id FROM jobs WHERE job_id = ${jobId}
    `;

    if (!job) {
      throw new ErrorHandler(404, "job not found");
    }

    if (job.posted_by_recruiter_id !== user.user_id) {
      throw new ErrorHandler(403, "Forbidden you are not allowed");
    }

    const applications = await sql`
      SELECT * FROM application WHERE job_id = ${jobId} ORDER BY subscribed DESC, applied_at ASC
    `;

    res.json(applications);
  },
);

export const updateApplicationStatus = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "Authentication required");
    }

    if (user.role !== "recruiter") {
      throw new ErrorHandler(403, "Forbidden: Only recruiter can acces this.");
    }

    const { id } = req.params; //application id..

    const [application] = await sql`
      SELECT * FROM application WHERE application_id = ${id}
    `;

    if (!application) {
      throw new ErrorHandler(404, "Application not found");
    }

    const [job] = await sql`
      SELECT posted_by_recruiter_id, title FROM jobs WHERE job_id = ${application.job_id}
    `;

    if (!job) {
      throw new ErrorHandler(404, "No job with this id");
    }

    if (job.posted_by_recruiter_id !== user.user_id) {
      throw new ErrorHandler(403, "Forbidden: you are not allowed");
    }

    const [updatedApplication] = await sql`
      UPDATE application SET status = ${req.body.status} WHERE application_id = ${id} RETURNING *
    `;

    //sending message to kafka  queue....
    const message = {
      to: application.applicant_email,
      subject: "Application Status - jobvyn",
      html: applicationStatusUpdateTemplate(job.title),
    };

    //publish the message to kafka broker...
    publishToTopic("send-mail", message).catch((error) => {
      console.log("Failed to publish message to kafka", error);
    });

    res.json({
      message: "✅ Application Status updated successfully",
      job,
      updatedApplication,
    });
  },
);
