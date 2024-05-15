// import request from '@/lib/request';
// import useUserStore from '@/zustand/userStore';
// import { useQuery } from '@tanstack/react-query';
// import { QUERY_KEYS } from './react-query.config';

// function useGetUserQuery() {

//   const setUser = useUserStore((state) => state.setUser);

//   const userId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);

//   return useQuery({
//     queryKey: [QUERY_KEYS.query.user],
//     queryFn: async () => {
//       const { data } = await request.post<any>(`users/${userId}`);
//       setUser(userData);

//       return data.data;
//     },
//     enabled: !!userId,
//   });
// }

// export default useGetUserQuery;
