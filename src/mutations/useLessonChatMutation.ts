import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import { ChatResponse } from "@/types/lessons.types";
import { useMutation } from "@tanstack/react-query";

const useLessonChatMutation = (lessonId: string) => {
  return useMutation({
    mutationFn: async (question: string): Promise<ChatResponse> => {
      const { data } = await request.post<ChatResponse>(ENDPOINTS.lesson.chat(lessonId), {
        question,
      });
      return data;
    },
  });
};

export default useLessonChatMutation;
