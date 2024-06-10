import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { Question } from "@/types/lessons.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateQuizMutation = (lessonId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Question[]) => {
      const { data } = await request.put(ENDPOINTS.quiz.oneQuiz(lessonId), {
        questions: values,
      });

      return data;
    },
    onSuccess: async () => {
      toast.success("Quiz updated successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.quiz, lessonId],
      });
    },
  });
};

export default useUpdateQuizMutation;
