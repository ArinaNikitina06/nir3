export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: string;
  level: CourseLevel;
  durationMinutes: number;
  priceRub: number;
  rating: number;
  tags: string[];
};

