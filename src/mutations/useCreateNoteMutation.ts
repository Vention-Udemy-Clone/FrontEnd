import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { NoteCreateRequest, NoteCreateResponse } from "@/types/lesson.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: NoteCreateRequest) => {
      const { data } = await request.post<NoteCreateResponse>(ENDPOINTS.note.root, values);

      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.note.notes, data.data.lessonId],
      });
    },
  });
};

export default useCreateNoteMutation;
