import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { SummaryCreateResponse, SummaryUpdateRequest } from "@/types/summary.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateSummaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SummaryUpdateRequest) => {
      const { data } = await request.patch<SummaryCreateResponse>(
        ENDPOINTS.summary.oneSummary(values.lessonId as string),
        values
      );

      return data;
    },

    onSuccess: async (data) => {
      toast.success("Summary updated successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.summary.summary, data.data.lessonId],
      });
    },
  });
};

export default useUpdateSummaryMutation;
