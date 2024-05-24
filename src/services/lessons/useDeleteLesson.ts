import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";

export const useDeleteLesson = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (lessonId: string) => {
      return await request.delete(`${ENDPOINTS.lesson.root}/${lessonId}`);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
    },
  });

  return { deleteLesson: mutate, status };
};
