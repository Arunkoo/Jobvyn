export interface jobOptions {
  title: string;
  responsibilities: string;
  why: string;
}
export interface Skills {
  title: string;
  why: string;
  how: string;
}

export interface skillsToLearn {
  category: string;
  skills: Skills[];
}

export interface LearningApproach {
  title: string;
  points: [];
}
export interface SkillCategory {
  category: string;
  skills: skillsToLearn[];
}

export interface CarrerGuideResponse {
  summary: string;
  jobOptions: jobOptions[];
  skillsToLearn: skillsToLearn[];
  learningApproach: LearningApproach;
}

export const utils_service_url = "http://localhost:5001";
