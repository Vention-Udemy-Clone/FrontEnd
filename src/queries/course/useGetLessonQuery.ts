import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { LessonResponse } from "@/types/lessons.types";
import { useQuery } from "@tanstack/react-query";

function useGetLessonQuery(lessonId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.lesson, lessonId],
    queryFn: async () => {
      const { data } = await request.get<LessonResponse>(ENDPOINTS.lesson.getOneLesson(lessonId));

      return data.data;
    },
    enabled: !!lessonId,
  });
}

export default useGetLessonQuery;
