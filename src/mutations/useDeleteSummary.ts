import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { SummaryCreateResponse, SummaryDeleteRequest } from "@/types/summary.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteSummaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SummaryDeleteRequest) => {
      const { data } = await request.delete<SummaryCreateResponse>(
        ENDPOINTS.summary.oneSummary(values.id)
      );

      return data;
    },
    onSuccess: async (data) => {
      toast.success("Summary deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.summary.summary, data.data.lessonId],
      });
    },
  });
};

export default useDeleteSummaryMutation;
