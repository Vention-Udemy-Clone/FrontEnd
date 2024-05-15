import { ENDPOINTS } from "@/config/enpoints.config";
import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import request from "@/lib/request";
import { setValueToLocalStorage } from "@/lib/utils";
import { Login, LoginResponse } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: Login) => {
      const { data } = await request.post<LoginResponse>(ENDPOINTS.auth.signIn, values);
      return data;
    },
    onSuccess: async (data) => {
      // await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.user] });
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.sub, data.data.id);
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.accessToken, data.data.accessToken);
    },
  });
};

export default useSignInMutation;
