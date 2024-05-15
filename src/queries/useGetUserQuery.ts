import { ENDPOINTS } from "@/config/endpoints.config";
import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { getValueFromLocalStorage } from "@/lib/utils";
import useUserStore from "@/store/userStore";
import { UserResponse } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";

function useGetUserQuery() {
  const userId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);
  const setUser = useUserStore((state) => state.setUser);

  return useQuery({
    queryKey: [QUERY_KEYS.query.user],
    queryFn: async () => {
      const { data } = await request.get<UserResponse>(ENDPOINTS.user.user(userId));
      setUser(data.data);
      return data.data;
    },
    enabled: !!userId,
  });
}

export default useGetUserQuery;
