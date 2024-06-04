import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { ModuleRequest } from "@/types/modules.types";

export const useCreateModule = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (data: ModuleRequest) => {
      return await request.post(`${ENDPOINTS.module.root}/${id}`, data);
    },

    onSuccess: async () => {
      toast.success("Module created successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
    },
  });

  return { createModule: mutate, status };
};
