import axios from "axios";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register controller
export const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, phoneNumber, role, bio } = req.body;

  if (!name || !email || !password || !phoneNumber || !role) {
    throw new ErrorHandler(400, "All details are required to register.");
  }

  const existingUser = await sql`
    SELECT user_id FROM users
    WHERE email = ${email}
  `;

  if (existingUser.length > 0) {
    throw new ErrorHandler(409, "User with this email already exits");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let registeredUser;

  if (role === "recruiter") {
    const [user] = await sql`
      INSERT INTO users (name, email, password, phone_number,role) VALUES
      (${name}, ${email}, ${hashPassword}, ${phoneNumber}, ${role}) RETURNING
      user_id, name, email,phone_number, role,created_at
    `;
    registeredUser = user;
  } else if (role === "jobseeker") {
    //handling file logic....
    const file = req.file;

    if (!file) {
      throw new ErrorHandler(
        400,
        "Please upload a valid resume file to authenticate."
      );
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
      throw new ErrorHandler(500, "Failed to generate buffer");
    }

    const { data } = await axios.post(
      `${process.env.UPLOAD_SERVICE_URL}/api/utils/upload`,
      { buffer: fileBuffer.content }
    );

    //log for bug
    // console.log("UPLOAD URL:", process.env.UPLOAD_SERVICE_URL);
    // console.log("BUFFER TYPE:", typeof fileBuffer.content);
    // console.log("BUFFER SIZE:", fileBuffer.content.length);

    const [user] = await sql` 
      INSERT INTO users (name, email, password, phone_number,role, bio, resume, resume_public_id) VALUES
      (${name}, ${email}, ${hashPassword}, ${phoneNumber}, ${role}, ${bio}, ${data.url},${data.public_id} ) RETURNING
      user_id, name, email,phone_number, role, bio, resume, created_at
    `;
    registeredUser = user;
  }

  //generating token....
  const token = jwt.sign(
    { id: registeredUser?.user_id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15d",
    }
  );

  return res.status(201).json({
    success: true,
    message: "✅User registered successfully",
    registeredUser,
    token,
  });
});

//loginController.
export const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorHandler(400, "Please provide all nesscary details.");
  }

  const user = await sql`
    SELECT 
      u.user_id, 
      u.name, 
      u.email, 
      u.password, 
      u.phone_number, 
      u.role, 
      u.bio, 
      u.resume, 
      u.profile_pic, 
      u.subscription, 
    ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills 
    FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id LEFT JOIN skills s ON us.skill_id = s.skill_id WHERE u.email = ${email} GROUP BY U.user_id;
  `;

  if (user.length === 0) {
    throw new ErrorHandler(400, "Invalid credentials");
  }
  const userObject = user[0];

  const matchPassword = await bcrypt.compare(password, userObject.password);

  if (!matchPassword) {
    throw new ErrorHandler(400, "Invalid credentials");
  }

  // maybe user skill is empty so we handle it...
  userObject.skills = userObject.skills || [];
  delete userObject.password; //security check..

  //generating token....
  const token = jwt.sign(
    { id: userObject?.user_id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15d",
    }
  );

  return res.status(200).json({
    success: true,
    message: "✅User LoggedIn successfully",
    userObject,
    token,
  });
});
