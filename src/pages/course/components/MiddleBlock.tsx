import Tiptap from "@/components/Tiptap";
import { Separator } from "@/components/ui/separator";
import useGetLessonQuery from "@/queries/course/useGetLessonQuery";
import useGetSummaryQuery from "@/queries/summary/useGetSummaryQuery";
import { useUserStore } from "@/store/userStore";
import { useParams } from "react-router-dom";
import LessonQuizModal from "./LessonQuizModal";
import { LessonSummary } from "./LessonSummary";
import { FinalTiptap } from "./LessonTiptap";
export const MiddleBlock = ({
  activeLessonAndModule: { moduleNum, lessonNum },
  bgImageUrl,
}: {
  activeLessonAndModule: { moduleNum: string; lessonNum: string };
  bgImageUrl: string;
}) => {
  const { lessonId } = useParams();
  const { isPending, data: lesson, isError } = useGetLessonQuery(lessonId as string);

  const user = useUserStore((state) => state.user);
  const { data: summary } = useGetSummaryQuery(lessonId as string, user.id);

  // ! Make a Skeleton component to show a loading state
  if (isPending) return <div className="grow">Loading...</div>;
  if (isError) return <div className="grow">Error...</div>;

  return (
    <div className="relative w-6/12 grow items-center justify-center px-4 max-[1100px]:px-0">
      <div className="group mb-4 h-[330px] overflow-hidden max-[700px]:h-[250px] max-[600px]:h-[170px] max-[550px]:hidden">
        <div className="absolute z-20 overflow-hidden"></div>
        <div
          className={`relative h-full w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat  before:absolute  before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-gradient-24 before:from-primary before:from-[-10%] before:via-transparent before:to-transparent before:transition-all before:duration-500 before:ease-linear before:content-[''] group-hover:before:-top-36 group-hover:before:scale-[2]`}
        >
          <img
            className="h-full w-full object-cover"
            src={bgImageUrl || "https://picsum.photos/1920/1080"}
            alt=""
          />
        </div>
        <div className="relative left-4 top-3 z-30 mb-[285px] mt-[-330px] pr-8 font-bold transition-all duration-300 group-hover:-top-20 max-[700px]:mt-[-250px] max-[600px]:mt-[-175px]">
          <p className="text-xs text-gray-200 ">
            Module {moduleNum || 1} • Lesson {lessonNum || 1}
          </p>
          <p className=" line-clamp-1 text-sm text-gray-200">{lesson.title}</p>
        </div>
      </div>
      <div>
        <div key={lesson.id}>
          <div className="relative mb-4 rounded-xl">
            <div>
              <h1 className="mb-3 font-semibold max-[500px]:text-sm">{lesson.title}</h1>
              <Separator orientation="horizontal" className="mb-3" />
              <h3 className="mb-1 text-sm font-bold text-primary">Overview:</h3>
              <Tiptap
                editable={false}
                content={lesson.overview}
                className="min-h-fit border-0"
                onChange={(htmlContent) => console.log(htmlContent)}
              />
            </div>
          </div>
          <div className="mb-5">
            <FinalTiptap lesson={lesson.content} userId={user.id} />
          </div>
        </div>
      </div>

      <LessonQuizModal lessonId={lessonId as string} />
      <Separator className="my-6" />
      {user.id && <LessonSummary summary={summary} />}
    </div>
  );
};
