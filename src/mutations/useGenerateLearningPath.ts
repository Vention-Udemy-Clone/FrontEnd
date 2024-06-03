import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import { Level } from "@/types/course.types";
import { LearningPathResponse } from "@/types/learning-path.types";
import { useMutation } from "@tanstack/react-query";

function useGenerateLearningPath() {
  return useMutation({
    mutationFn: async ({ stack, level }: { stack: string; level: Level }) => {
      const { data } = await request.post<LearningPathResponse>(ENDPOINTS.learningPath, {
        stack,
        level,
      });
      return data.data;
    },
  });
}

export default useGenerateLearningPath;
