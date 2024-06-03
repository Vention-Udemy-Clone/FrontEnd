import { Level } from "./course.types";

export type Course = {
  id: string;
  title: string;
  level: Level;
};

export type LearningPathResponse = {
  success: boolean;
  data: {
    selectedCourses: Course[];
    recommendations: string[];
    courseFound: boolean;
  };
};
