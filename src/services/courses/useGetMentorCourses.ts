import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CoursesResponse } from "@/types/course.types";

export const useGetMyCourses = (authorId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.courses.myCourses],

    queryFn: async () => {
      const { data } = await request.get<CoursesResponse>(ENDPOINTS.course.myCourses(authorId));
      return data;
    },
  });
};
