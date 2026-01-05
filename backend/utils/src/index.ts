import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import routes from "./routes";
// load env..
dotenv.config();

//cloudinary configration....
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//intialize app...
const app = express();

//cross origin for cross platform connection through api's
app.use(cors());
//middleware..
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/utils", routes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Utils Service is running on http://localhost:${port}`);
});
