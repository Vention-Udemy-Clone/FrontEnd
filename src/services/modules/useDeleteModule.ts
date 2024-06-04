import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";

export const useDeleteModule = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (moduleId: string) => {
      return await request.delete(`${ENDPOINTS.module.root}/${moduleId}`);
    },

    onSuccess: async () => {
      toast.success("Module deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, id],
      });
    },
  });

  return { deleteModule: mutate, status };
};
