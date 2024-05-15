import { Course } from "@/types/course.types";
import { Bookmark } from "lucide-react";

export const CourseCard = ({ course }: { course: Course }) => {
  const {
    title,
    description,
    level,
    author: { fullName },
  } = course;

  return (
    <div className="mx-auto flex max-w-[400px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-2 hover:cursor-pointer hover:shadow-md sm:mx-0 sm:max-w-none">
      <div>
        <img
          className="h-40 w-full object-cover"
          src="https://source.unsplash.com/random"
          alt="courseimage "
        />
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="flex gap-4">
          <h4 className="mr-auto text-lg font-semibold">{title}</h4>
          <Bookmark className="text-gray-300" />
        </div>

        <p className="mb-10 mt-3 line-clamp-2 flex-grow text-sm text-gray-600">{description}</p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 shrink-0 rounded-full"
              src="https://source.unsplash.com/random"
              alt="authorimage"
            />
            <div className="overflow-hidden">
              <p className="line-clamp-1 break-words text-sm/4 text-gray-500">{fullName}</p>
            </div>
          </div>

          <p className="ml-auto text-xs/3 font-bold text-primary">{level}</p>
        </div>
      </div>
    </div>
  );
};
