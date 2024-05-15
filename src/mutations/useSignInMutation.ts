// import request from "@/lib/request";
// import { setValueToLocalStorage } from "@/lib/utils";

// const useSignInMutation = () => {
//   return useMutation({
//     mutationFn: async (values: any) => {
//       const { data } = await request.post<any>(ENDPOINTS.auth.signIn, values);
//       return data;
//     },
//     onSuccess: (data) => {
//       setValueToLocalStorage(LOCAL_STORAGE_KEYS.sub, data.id);
//     },
//   });
// };

// export default useSignInMutation;
// function useMutation(arg0: {
//   mutationFn: (values: SignInReq) => Promise<any>;
//   onSuccess: (data: any) => void;
// }) {
//   throw new Error("Function not implemented.");
// }
