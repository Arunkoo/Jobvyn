import dotenv from "dotenv";
import app from "./app.js";
import { sql } from "./utils/db.js";

dotenv.config();
const Port = process.env.PORT || 5000;

async function initDb() {
  try {
    await sql`
    DO $$
    BEGIN
      IF NOT EXISTS(
        SELECT 1 
        FROM pg_type 
        WHERE typname = 'user_role'
      ) THEN
        CREATE TYPE user_role AS ENUM ('jobseeker', 'recruiter');
      END IF;
    END$$;      
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(225) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(225) NOT NULL,
        phone_number VARCHAR(20) NOT NULL UNIQUE,
        role user_role NOT NULL,
        bio TEXT,
        resume VARCHAR(225),
        resume_public_id VARCHAR(225),
        profile_pic VARCHAR(225),
        profile_pic_public_id VARCHAR(225),
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        subscription TIMESTAMPTZ

    )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS skills(
        skill_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS user_skills(
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
        PRIMARY KEY(user_id, skill_id)
      )
      `;

    console.log("✅ Database tables checked/created successfully.");
  } catch (error) {
    console.log("❌ Error intializing database.", error);
    process.exit(1);
  }
}

//intializing the db..
initDb().then(() => {
  app.listen(Port, () => {
    console.log(`Auth Service is running at Port:${Port}`);
  });
});
