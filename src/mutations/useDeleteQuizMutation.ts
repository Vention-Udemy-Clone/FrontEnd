import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteQuizMutation = (lessonId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await request.delete(ENDPOINTS.quiz.oneQuiz(lessonId));

      return data;
    },
    onSuccess: async () => {
      toast.success("Quiz deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.quiz, lessonId],
      });
    },
  });
};

export default useDeleteQuizMutation;
