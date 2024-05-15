import { ENDPOINTS } from "@/config/enpoints.config";
import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { getValueFromLocalStorage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

function useGetUserQuery() {
  const userId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);

  return useQuery({
    queryKey: [QUERY_KEYS.query.user],
    queryFn: async () => {
      const { data } = await request.get<any>(ENDPOINTS.user.user(userId));
      return data.data;
    },
    enabled: !!userId,
  });
}

export default useGetUserQuery;
