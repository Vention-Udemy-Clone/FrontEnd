import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CreateCourseResponse } from "@/types/course.types";
import { ModuleRequest } from "@/types/modules.types";

export const useUpdateModule = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (data: ModuleRequest & { id: string }) => {
      return await request.patch<CreateCourseResponse>(`${ENDPOINTS.module.root}/${data.id}`, data);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.course, id],
      });
    },
  });

  return { updateModule: mutate, status };
};
