import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import { GenerateLessonTextsRequest, GenerateLessonTextsResponse } from "@/types/lesson.types";
import { useMutation } from "@tanstack/react-query";

const useGenerateLessonTexts = () => {
  return useMutation({
    mutationFn: async (values: GenerateLessonTextsRequest) => {
      const { data } = await request.post<GenerateLessonTextsResponse>(
        ENDPOINTS.lesson.generateTexts,
        values
      );
      return data;
    },
  });
};

export default useGenerateLessonTexts;
