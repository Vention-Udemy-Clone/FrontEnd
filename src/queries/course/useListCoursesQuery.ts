import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/enpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CoursesResponse } from "@/types/course.types";

export function useListCoursesQuery() {
  return useQuery({
    queryKey: [QUERY_KEYS.query.listCourses],

    queryFn: async () => {
      const { data } = await request.get<CoursesResponse>(ENDPOINTS.course.listCourses);

      return data;
    },
  });
}
