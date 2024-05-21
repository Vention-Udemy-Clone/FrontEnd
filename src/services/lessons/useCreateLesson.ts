import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { LessonRequest, LessonResponse } from "@/types/lesson.types";

export const useCreateLesson = (moduleId: string) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (data: LessonRequest) => {
      return await request.post<LessonResponse>(`${ENDPOINTS.lesson.root}/${moduleId}`, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
    },
  });

  return { createLesson: mutate, status };
};
