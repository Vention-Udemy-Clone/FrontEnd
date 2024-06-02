import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import { SummaryGeneratedResponse } from "@/types/summary.types";
import { useMutation } from "@tanstack/react-query";

const useGenerateLessonSummary = (lessonId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await request.post<SummaryGeneratedResponse>(
        ENDPOINTS.summary.generateSummary(lessonId)
      );

      return data.data;
    },
  });
};

export default useGenerateLessonSummary;
