import { ENDPOINTS } from "@/config/endpoints.config";
import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import request from "@/lib/request";
import { setValueToLocalStorage } from "@/lib/utils";
import { Login, LoginResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (values: Login) => {
      const { data } = await request.post<LoginResponse>(ENDPOINTS.auth.signIn, values);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Logged in successfully", {});
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.sub, data.data.id);
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.accessToken, data.data.accessToken);
    },
  });
};

export default useSignInMutation;
