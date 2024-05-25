import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '@/config/endpoints.config';
import request from '@/lib/request';

const useRegenerateQuizMutation = (lessonId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await request.get(ENDPOINTS.lesson.getQuiz(lessonId));
      return data.data;
    }
  })
}

export default useRegenerateQuizMutation;