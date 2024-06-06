import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CourseRequest, CreateCourseResponse } from "@/types/course.types";
import { toast } from "sonner";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (course: CourseRequest & { id: string }) => {
      return await request.patch<CreateCourseResponse>(
        `${ENDPOINTS.course.root}/${course.id}`,
        course
      );
    },

    onSuccess: async (res) => {
      toast.success("Course updated successfully");
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.courses.myCourses] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, res.data.data.id],
      });
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.listCourses] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.course, res.data.data.id],
      });
    },
  });

  return { updateCourse: mutate, status };
};
