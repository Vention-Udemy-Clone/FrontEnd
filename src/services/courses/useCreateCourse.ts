import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CourseRequest, CreateCourseResponse } from "@/types/course.types";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigte = useNavigate();
  const { mutate, status } = useMutation({
    mutationFn: async (course: CourseRequest) => {
      return await request.post<CreateCourseResponse>(ENDPOINTS.course.root, course);
    },

    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.courses.myCourses] });
      navigte(`/my-courses/${res.data.data.id}`);
    },
  });

  return { createCourse: mutate, status };
};
