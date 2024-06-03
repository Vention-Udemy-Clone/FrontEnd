import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { NoteCreateResponse, NoteUpdateRequest } from "@/types/lesson.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateNoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: NoteUpdateRequest) => {
      const { data } = await request.patch<NoteCreateResponse>(ENDPOINTS.note.oneNote(values.id), {
        note: values.note,
      });

      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.note.notes, data.data.lessonId],
      });
    },
  });
};

export default useUpdateNoteMutation;
