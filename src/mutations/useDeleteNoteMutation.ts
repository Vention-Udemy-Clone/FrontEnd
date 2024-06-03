import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { NoteCreateResponse, NoteDeleteRequest } from "@/types/lesson.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: NoteDeleteRequest) => {
      const { data } = await request.delete<NoteCreateResponse>(ENDPOINTS.note.oneNote(values.id));

      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.note.notes, data.data.lessonId],
      });
    },
  });
};

export default useDeleteNoteMutation;
