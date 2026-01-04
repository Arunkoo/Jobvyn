import axios from "axios";
import getBuffer from "../utils/buffer.js";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

//Register controller
const registerUser = TryCatch(async (req, res, next) => {
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
    console.log("UPLOAD URL:", process.env.UPLOAD_SERVICE_URL);
    console.log("BUFFER TYPE:", typeof fileBuffer.content);
    console.log("BUFFER SIZE:", fileBuffer.content.length);

    const [user] = await sql` 
      INSERT INTO users (name, email, password, phone_number,role, bio, resume, resume_public_id) VALUES
      (${name}, ${email}, ${hashPassword}, ${phoneNumber}, ${role}, ${bio}, ${data.url},${data.public_id} ) RETURNING
      user_id, name, email,phone_number, role, bio, resume, created_at
    `;
    registeredUser = user;
  }

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: registeredUser,
  });
});

//loginController.
// const loginUser = async () => {};

export default registerUser;
