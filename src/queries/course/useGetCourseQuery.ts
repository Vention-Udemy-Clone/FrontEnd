import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CourseResponse } from "@/types/course.types";
import { useQuery } from "@tanstack/react-query";

function useGetCourseQuery(courseId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.course, courseId],
    queryFn: async () => {
      const { data } = await request.get<CourseResponse>(ENDPOINTS.course.getOneCourse(courseId));

      console.log("file: useGetCourseQuery.ts:13 ~ queryFn: ~ data:", data);

      return data.data;
    },
    enabled: !!courseId,
  });
}

export default useGetCourseQuery;
