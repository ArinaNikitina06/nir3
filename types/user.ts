export type UserPreference = {
  category?: string | null;
  level?: "Beginner" | "Intermediate" | "Advanced" | null;
  interests: string[];
};

