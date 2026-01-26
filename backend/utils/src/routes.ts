import express from "express";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//career guidance...//
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

//resume Analyzier......//FIXME:
router.post("/resumeAnalyzer", async (req, res) => {
  try {
    const { pdfBase64 } = req.body;
    if (!pdfBase64) {
      return res.status(400).json({ message: "Pdf file is required." });
    }

    //prompt
    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer. Analyze the following resume
and provide:
1. An ATS compatibility score (0-100)
2. Detailed suggestions to improve the resume for better ATS performance
Your entire response must be in valid JSON format. Do not include any text or markdown
formatting outside of the JSON structure.
The JSON object should have the following structure:

{
"atsScore": 85,
"scoreBreakdown": {
"formatting": {
"score": 90,
"feedback": "Brief feedback on formatting"
},
"keywords": {
"score": 80,
"feedback": "Brief feedback on keyword usage"
},
"structure": {
"score": 85,
"feedback": "Brief feedback on resume structure"
},
"readability": {
"score": 88,
"feedback": "Brief feedback on readability"
}
},
"suggestions": [
{
"category": "Category name (e.g., 'Formatting', 'Content', 'Keywords',
'Structure')",
"issue": "Description of the issue found",
"recommendation": "Specific actionable recommendation to fix it",
"priority": "high/medium/low"
}
],
"strengths": [
"List of things the resume does well for ATS"
],
"summary": "A brief 2-3 sentence summary of the overall ATS performance"
}
Focus on:
- File format and structure compatibility
- Proper use of standard section headings
- Keyword optimization
- Formatting issues (tables, columns, graphics, special characters)
- Contact information placement
- Date formatting
- Use of action verbs and quantifiable achievements
- Section organization and flow
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
              },
            },
          ],
        },
      ],
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
