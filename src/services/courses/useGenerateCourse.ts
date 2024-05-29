import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CourseResponse, GenerateCourseRequest } from "@/types/course.types";

export const useGenerateCourse = () => {
  const queryClient = useQueryClient();
  const navigte = useNavigate();
  const { mutate, status, data } = useMutation({
    mutationFn: async (data: GenerateCourseRequest) => {
      return await request.post<CourseResponse>(ENDPOINTS.course.generateCourse, data);
    },

    onSuccess: async () => {
      toast.success("Course generated successfully", {});
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.courses.myCourses] });
      // navigte(`/my-courses`);
    },
  });

  return { generateCourse: mutate, status, generatedCourse: data?.data.data };
};
