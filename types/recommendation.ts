import type { Course } from "@/types/course";

export type RecommendationScore = {
  courseId: string;
  score: number;
  reasons: string[];
};

export type RecommendedCourse = Course & {
  recommendation?: RecommendationScore;
};

