export interface JobOption {
  title: string;
  responsibilities: string;
  why: string;
}

export interface Skill {
  title: string;
  why: string;
  how: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface LearningApproach {
  title: string;
  points: string[];
}

export interface CareerGuideResponse {
  summary: string;
  jobOptions: JobOption[];
  skillsToLearn: SkillCategory[];
  learningApproach: LearningApproach;
}

export interface ScoreBreakdown {
  formatting: { score: number; feedback: string };
  keywords: { score: number; feedback: string };
  structure: { score: number; feedback: string };
  readability: { score: number; feedback: string };
}
export interface Suggestion {
  category: string;
  issue: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
}
export interface ResumeAnalysisResponse {
  atsScore: number;
  scoreBreakdown: ScoreBreakdown;
  suggestions: Suggestion[];
  strengths: string[];
  summary: string;
}

export const utils_service_url = "http://localhost:5001";
