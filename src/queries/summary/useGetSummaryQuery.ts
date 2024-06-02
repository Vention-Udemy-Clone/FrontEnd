import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { SummaryCreateResponse } from "@/types/summary.types";
import { useQuery } from "@tanstack/react-query";

function useGetSummaryQuery(lessonId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.summary.summary, lessonId],
    queryFn: async () => {
      const { data } = await request.get<SummaryCreateResponse>(
        ENDPOINTS.summary.oneSummary(lessonId)
      );

      return data.data;
    },
  });
}

export default useGetSummaryQuery;
