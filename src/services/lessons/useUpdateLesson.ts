import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { LessonRequest, LessonResponse } from "@/types/lesson.types";

export const useUpdateLesson = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (data: LessonRequest & { id: string }) => {
      return await request.patch<LessonResponse>(`${ENDPOINTS.lesson.root}/${data.id}`, data);
    },

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.lessons.lesson, res.data.data.id],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.course, id],
      });
    },
  });

  return { updateLesson: mutate, status };
};
