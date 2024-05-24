import useGetLessonQuery from "@/queries/course/useGetLessonQuery";
import { useParams } from "react-router-dom";
import LessonQuizModal from "./LessonQuizModal";

export const MiddleBlock = ({
  activeLessonAndModule: { moduleNum, lessonNum },
}: {
  activeLessonAndModule: { moduleNum: string; lessonNum: string };
}) => {
  const { lessonId } = useParams();
  const { isPending, data: lesson, isError } = useGetLessonQuery(lessonId as string);

  if (isPending) return <div className=" min-w-[500px]">Loading...</div>;
  if (isError) return <div className=" min-w-[500px]">Error...</div>;

  return (
    <div className="relative w-4/12  grow items-center justify-center ">
      <div className="group mb-3 h-[330px] overflow-hidden max-[700px]:h-[250px] max-[600px]:h-[170px] max-[550px]:hidden">
        <div className="absolute z-20 overflow-hidden"></div>
        <div className="before:bg-gradient-24 relative h-full w-full overflow-hidden rounded-3xl bg-[url('https://source.unsplash.com/random')] bg-cover bg-center bg-no-repeat px-5 py-4  before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:from-primary before:from-10% before:via-transparent before:to-transparent before:transition-all before:duration-500 before:ease-linear before:content-[''] group-hover:before:-top-36 group-hover:before:scale-[2]"></div>
        <div className="relative left-4 top-3 z-30 mb-[285px] mt-[-330px]  pr-8 font-bold transition-all duration-300 group-hover:-top-20 max-[700px]:mt-[-250px] max-[600px]:mt-[-175px]">
          <p className="text-sm text-gray-200 ">
            Module {moduleNum || 1} • Lesson {lessonNum || 1}
          </p>
          <p className=" line-clamp-1 text-gray-200">{lesson.title}</p>
        </div>
      </div>
      <div>
        <div key={lesson.id}>
          <div className="relative mb-5 rounded-2xl border-2 p-3">
            <div>
              <h1 className="mb-5 text-lg font-semibold  max-[500px]:text-base">{lesson.title}</h1>
              <p className="font-semibold "> {lesson.overview}</p>
            </div>
          </div>
          <div className="mb-5 rounded-2xl border-2 p-3 text-gray-900 dark:text-gray-200  ">
            {lesson.content}
          </div>
        </div>
      </div>
      <LessonQuizModal
        lessonId={lessonId as string}
      />
    </div>
  );
};
