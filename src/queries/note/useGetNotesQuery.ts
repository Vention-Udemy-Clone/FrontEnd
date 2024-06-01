import { ENDPOINTS } from "@/config/endpoints.config";
import { QUERY_KEYS } from "@/config/react-query.config";
import request from "@/lib/request";
import { GetNotesResponse } from "@/types/lesson.types";
import { useQuery } from "@tanstack/react-query";

function useGetNotesQuery(lessonId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.query.note.notes, lessonId],
    queryFn: async () => {
      const { data } = await request.get<GetNotesResponse>(ENDPOINTS.note.listNotes(lessonId));

      return data.data;
    },
  });
}

export default useGetNotesQuery;
