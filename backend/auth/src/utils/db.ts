import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

export const sql = neon(process.env.DB_URL as string);
