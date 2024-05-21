import { useQuery } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CourseResponse } from "@/types/course.types";

export const useGetMyCourse = (courseId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.query.courses.mycourse, courseId],

    queryFn: async () => {
      const { data } = await request.get<CourseResponse>(`${ENDPOINTS.course.root}/${courseId}`);
      return data;
    },

    enabled: !!courseId,
  });
};
