import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { CreateCourseResponse, GenerateCourseRequest } from "@/types/course.types";

export const useGenerateContent = () => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (data: GenerateCourseRequest) => {
      return await request.post<CreateCourseResponse>(ENDPOINTS.course.generateContent, data);
    },

    onSuccess: async (res) => {
      toast.success("Content generated successfully");
      // await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.query.courses.myCourses] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.courses.mycourse, res.data.data.id],
      });
    },
  });

  return { generateContent: mutate, status };
};
