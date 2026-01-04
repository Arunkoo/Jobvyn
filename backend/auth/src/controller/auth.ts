import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import bcrypt from "bcrypt";

//Register controller
const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, phone_number, role, bio } = req.body;

  if (!name || !email || password || phone_number || role) {
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

  if (role === "recrutier") {
    const [user] = await sql`
      INSERT INTO users (name, email, password, phone_number,role) VALUES
      (${name}, ${email}, ${hashPassword}, ${phone_number}, ${role}) RETURNING
      user_id, name, email,phone_number, role,created_at
    `;
    registeredUser = user;
  } else if (role === "jobseeker") {
    const [user] = await sql`
      INSERT INTO users (name, email, password, phone_number,role) VALUES
      (${name}, ${email}, ${hashPassword}, ${phone_number}, ${role}) RETURNING
      user_id, name, email,phone_number, role,created_at
    `;
    registeredUser = user;
  }
});

//loginController.
// const loginUser = async () => {};

export default registerUser;
