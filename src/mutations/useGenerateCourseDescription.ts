import { ENDPOINTS } from "@/config/endpoints.config";
import request from "@/lib/request";
import {
  GenerateCourseDescriptionRequest,
  GenerateCourseDescriptionResponse,
} from "@/types/course.types";
import { useMutation } from "@tanstack/react-query";

const useGenerateCourseDescription = () => {
  return useMutation({
    mutationFn: async (values: GenerateCourseDescriptionRequest) => {
      const { data } = await request.post<GenerateCourseDescriptionResponse>(
        ENDPOINTS.course.generateDescription,
        values
      );
      return data;
    },
  });
};

export default useGenerateCourseDescription;
