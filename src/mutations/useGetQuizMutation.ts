import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import { useMutation } from "@tanstack/react-query";

const useRegenerateQuizMutation = (lessonId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await request.get(ENDPOINTS.quiz.generateQuiz(lessonId));
      return data.data;
    },
  });
};

export default useRegenerateQuizMutation;
