//myProfile...

import axios from "axios";
import { AuthenticatedRequest } from "../middleware/auth.js";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import dotenv from "dotenv";

//load the environments...
dotenv.config();

//myProfile...{depends on token}
export const myProfile = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    res.json(user);
  }
);

//getUserProfile....{depend on params to fetch user_details}
//purpose to fetch either a candidate or recuriter by there company page...
export const getUserProfile = TryCatch(async (req, res, next) => {
  const { userId } = req.params;

  const users = await sql`
          SELECT
              u.user_id,
              u.name,
              u.email,
              u.phone_number,
              u.role,
              u.bio,
              u.resume,
              u.resume_public_id,
              u.profile_pic,
              u.profile_pic_public_id,
              u.subscription,
          ARRAY_AGG(s.name)
          FILTER (WHERE s.name IS NOT NULL) as skills
          FROM users u
          LEFT JOIN user_skills us
          ON u.user_id = us.user_id
          LEFT JOIN skills s
          ON us.skill_id = s.skill_id
          WHERE u.user_id = ${userId}
          GROUP BY u.user_id;
      `;

  if (users.length === 0) {
    throw new ErrorHandler(404, "User not found");
  }
  const user = users[0];
  user.skills = user.skills ?? [];

  res.json(user);
});

//updateuserProfile....
export const updateUserProfile = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Aunthentication required");
    }

    const { name, phoneNumber, bio } = req.body || {};

    if (!req.body) {
      throw new ErrorHandler(400, "Request body is missing");
    }

    const newName = name || user.name;
    const newPhoneNumber = phoneNumber || user.phone_number;
    const newBio = bio || user.bio;

    const [updatedUser] = await sql`
      UPDATE users SET name = ${newName},
        phone_number = ${newPhoneNumber}, 
        bio = ${newBio}
      WHERE user_id = ${user.user_id}
      RETURNING user_id, name, email, phone_number, bio  
    `;

    res.json({
      message: "✅ Profile Updated succesfully",
      updatedUser,
    });
  }
);

//upload or update profileImage...

export const updateProfilePic = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Authentication required");
    }

    const file = req.file;
    if (!file) {
      throw new ErrorHandler(401, "❌ Image is not provided");
    }

    const oldPublicId = user.profile_pic_public_id;

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new ErrorHandler(500, "❌ Failed to generate buffer.");
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`,
      {
        buffer: fileBuffer.content,
        public_id: oldPublicId,
      }
    );

    const [updatedUser] = await sql`
      UPDATE users SET 
        profile_pic = ${uploadResult.url},
        profile_pic_public_id = ${uploadResult.public_id}
      WHERE user_id = ${user.user_id}
      RETURNING user_id, name, profile_pic;
    `;

    res.json({
      message: "✅ Profile Image Updated Succesfully",
      updatedUser,
    });
  }
);

//upload or update resume...
export const updateResume = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Authentication required");
    }

    const file = req.file;

    if (!file) {
      throw new ErrorHandler(401, "❌ pdf file is not provided");
    }

    const oldPublicId = user.resume_public_id;
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
      throw new ErrorHandler(500, "❌ Failed to generate buffer.");
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`,
      {
        buffer: fileBuffer.content,
        public_id: oldPublicId,
      }
    );

    const [updatedUser] = await sql`
      UPDATE users SET resume = ${uploadResult.url},
      resume_public_id = ${uploadResult.public_id}
      WHERE user_id = ${user.user_id}
      RETURNING user_id, name, resume;
    `;

    res.json({
      message: "✅ Resume Updated Succesfully",
      updatedUser,
    });
  }
);

//add skill to userProfile..
export const addSkillToUser = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const userId = req.user?.user_id;

    if (!userId) {
      throw new ErrorHandler(401, "❌ User Id is Undefined or Null");
    }

    const { skillName } = req.body;

    if (!skillName || skillName.trim() === "") {
      throw new ErrorHandler(400, "❌ Please Provide atleast one skill");
    }

    const normalizedSkill = skillName.trim().toLowerCase();
    let isSkillAlreadyPresent = false;

    try {
      await sql`BEGIN`;
      const user =
        await sql`SELECT user_id FROM users WHERE user_id = ${userId}`;

      if (user.length === 0) {
        throw new ErrorHandler(404, "❌ User not found");
      }
      //query below hanlde duplicate rows while returning id properly..
      const [skill] =
        await sql`INSERT INTO skills (name) VALUES (${normalizedSkill}) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING skill_id`;

      const skillId = skill.skill_id;

      const insertionResult =
        await sql`INSERT INTO user_skills (user_id, skill_id) VALUES (${userId}, ${skillId}) ON CONFLICT (user_id, skill_id) DO NOTHING RETURNING user_id`;

      if (insertionResult.length > 0) {
        isSkillAlreadyPresent = true;
      }

      await sql`COMMIT`;
    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }

    if (!isSkillAlreadyPresent) {
      return res.status(200).json({
        message: "❌ Skill already exists.",
      });
    }

    res.json({
      message: `✅ Skill ${normalizedSkill} is added successfully`,
    });
  }
);

//delete skill in userProfile...
export const deleteSkillFromUser = TryCatch(
  async (req: AuthenticatedRequest, res, next) => {
    const user = req.user;

    if (!user) {
      throw new ErrorHandler(401, "❌ Authentication Required");
    }

    const { skillName } = req.body;

    if (!skillName || skillName.trim() === "") {
      throw new ErrorHandler(
        401,
        "❌ Please Select atleast one skill to delete"
      );
    }

    const normalizedSkill = skillName.trim().toLowerCase(); //to avoid duplicate and maintain proper floe..

    const result =
      await sql`DELETE FROM user_skills WHERE user_id = ${user.user_id} AND skill_id = (SELECT skill_id FROM skills WHERE name = ${normalizedSkill}) RETURNING user_id;`;

    if (result.length === 0) {
      throw new ErrorHandler(404, `❌ Skill ${normalizedSkill} was not found`);
    }

    res.json({
      message: `✅ Skill ${normalizedSkill} was deleted successfully`,
    });
  }
);
