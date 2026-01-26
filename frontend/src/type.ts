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

export const utils_service_url = "http://localhost:5001";
