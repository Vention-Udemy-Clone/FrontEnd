import { useGetLesson } from "@/services/lessons/useGetLesson";
import { LessonForm } from "./LessonForm";

type Props = {
  moduleId: string;
  lessonId?: string;
  setLessonId: (value: string) => void;
  lessonCreation: boolean;
  setLessonCreation: (value: boolean) => void;
};

export const LessonContent = ({
  moduleId,
  lessonId,
  setLessonId,
  lessonCreation,
  setLessonCreation,
}: Props) => {
  const { data } = useGetLesson(lessonId);

  return (
    <div className="min-h-64 rounded-md border p-4">
      {lessonCreation || lessonId ? (
        <LessonForm
          moduleId={moduleId}
          lessonId={lessonId}
          setLessonId={setLessonId}
          lessonCreation={lessonCreation}
          setLessonCreation={setLessonCreation}
          lessonData={lessonId ? data?.data : undefined}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
          <span className="w-3/4">Select a lesson to view its content or create a new lesson.</span>
        </div>
      )}
    </div>
  );
};
