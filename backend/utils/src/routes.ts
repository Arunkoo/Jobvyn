import express from "express";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post("/career", async (req, res) => {
  try {
    const skill = req.body.skill || req.body.skills;

    if (!skill) {
      return res.status(400).json({ message: "Skill is required" });
    }
    const prompt = `
Based on the following skills (may be empty or short): ${skill}.
Please act as a career advisor and generate a career path suggestion.

Your entire response must be in valid JSON format.
Do not include any text or markdown outside of the JSON.

Use EXACTLY the following structure and key names:

{
  "summary": "A brief, encouraging summary of the user's skill set and likely job title.",
  "jobOptions": [
    {
      "title": "Job role name",
      "responsibilities": "What the user does in this role",
      "why": "Why this role fits their skills"
    }
  ],
  "skillsToLearn": [
    {
      "category": "Skill category",
      "skills": [
        {
          "title": "Skill name",
          "why": "Why this skill matters",
          "how": "How to learn or apply it"
        }
      ]
    }
  ],
  "learningApproach": {
    "title": "How to Approach Learning",
    "points": ["Actionable learning advice"]
  }
}

Rules:
- Never change key names
- jobOptions: 2-4 items
- skillsToLearn: at least 2 categories, each with at least 2 skills
- learningApproach.points: at least 3 items
- If input is unclear, infer a reasonable early-career software role
- If unsure, return empty strings or empty arrays instead of omitting fields
`;
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const rawText = response.text;

    if (!rawText) {
      return res.status(500).json({ message: "Empty AI response" });
    }

    const jsonResponse = JSON.parse(rawText.replace(/```json|```/g, "").trim());

    return res.status(200).json(jsonResponse);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

// router.post("/career", async (req, res) => {
//   try {
//     const { skill } = req.body;
//     if (!skill) {
//       return res.status(400).json({
//         message: "Skill are required",
//       });
//     }

//     //prompt...
//     const prompt = `
// Based on the following skills (may be empty or short): ${skill}.
// Please act as a career advisor and generate a career path suggestion.

// Your entire response must be in valid JSON format.
// Do not include any text or markdown outside of the JSON.

// Use EXACTLY the following structure and key names:

// {
//   "summary": "A brief, encouraging summary of the user's skill set and likely job title.",
//   "jobOptions": [
//     {
//       "title": "Job role name",
//       "responsibilities": "What the user does in this role",
//       "why": "Why this role fits their skills"
//     }
//   ],
//   "skillsToLearn": [
//     {
//       "category": "Skill category",
//       "skills": [
//         {
//           "title": "Skill name",
//           "why": "Why this skill matters",
//           "how": "How to learn or apply it"
//         }
//       ]
//     }
//   ],
//   "learningApproach": {
//     "title": "How to Approach Learning",
//     "points": ["Actionable learning advice"]
//   }
// }

// Rules:
// - Never change key names
// - jobOptions: 2-4 items
// - skillsToLearn: at least 2 categories, each with at least 2 skills
// - learningApproach.points: at least 3 items
// - If input is unclear, infer a reasonable early-career software role
// - If unsure, return empty strings or empty arrays instead of omitting fields
// `;
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     let jsonResponse;

//     try {
//       const rawText = response.text
//         ?.replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//       if (!rawText) {
//         throw new Error("Ai  not able to return valid text response");
//       }
//       jsonResponse = JSON.parse(rawText);
//     } catch (error) {
//       return res.status(500).json({
//         message: "Ai not able to return valid JSON format",
//         rawResponse: response.text,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       response: jsonResponse,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });
//upload service route...
router.post("/upload", async (req, res) => {
  try {
    const { buffer, public_id } = req.body;
    //why? public_id because if let say user is updating its resume or profile pic than i need to get refrenve to delete the previous version of the image so that my space would be free in cloudinary...
    if (!buffer) {
      return res.status(400).json({ message: "Buffer is required" });
    }
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    const cloud = await cloudinary.uploader.upload(buffer);

    res.json({
      url: cloud.secure_url,
      public_id: cloud.public_id,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
