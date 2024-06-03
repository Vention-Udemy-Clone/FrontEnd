import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { SummaryCreateRequest, SummaryCreateResponse } from "@/types/summary.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateSummaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SummaryCreateRequest) => {
      const { data } = await request.post<SummaryCreateResponse>(ENDPOINTS.summary.root, values);

      return data;
    },
    onSuccess: async (data) => {
      toast.success("Summary created successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.summary.summary, data.data.lessonId],
      });
    },
  });
};

export default useCreateSummaryMutation;
