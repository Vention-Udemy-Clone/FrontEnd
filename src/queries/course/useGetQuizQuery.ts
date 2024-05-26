import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { QuizResponse } from "@/types/lessons.types";
import { useQuery } from "@tanstack/react-query";

function useGetQuizQuery(lessonId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.quiz, lessonId],
    queryFn: async () => {
      const { data } = await request.get<QuizResponse>(ENDPOINTS.lesson.getQuiz(lessonId));
      return data.data;
    },
    enabled: !!lessonId,
  });
}

export default useGetQuizQuery;
