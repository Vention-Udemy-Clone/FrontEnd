import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { LessonResponse } from "@/types/lesson.types";

export const useGetLesson = (lessonId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.lessons.lesson, lessonId],

    queryFn: async () => {
      const { data } = await request.get<LessonResponse>(`${ENDPOINTS.lesson.root}/${lessonId}`);
      return data;
    },

    enabled: !!lessonId,
  });
};
