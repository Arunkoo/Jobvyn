//create company ....

import axios from "axios";
import { AuthenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";

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
