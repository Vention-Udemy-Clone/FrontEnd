import { ROUTES } from "@/config/routes.config";
import { Course } from "@/types/course.types";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ course }: { course: Course }) => {
  const {
    id,
    title,
    description,
    level,
    author: { fullName },
  } = course;

  const navigate = useNavigate();

  const handleClickCourse = () => {
    navigate(ROUTES.course.course(id));
  };

  return (
    <div
      onClick={handleClickCourse}
      className="mx-auto flex max-w-[400px] flex-col overflow-hidden rounded-lg border bg-background transition-all hover:-translate-y-2 hover:cursor-pointer hover:shadow-md sm:mx-0 sm:max-w-none"
    >
      <div>
        <img
          className="h-40 w-full object-cover"
          src="https://jakeer.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fjakeer-cloudinary%2Fimage%2Fupload%2Fq_50%2Cf_auto%2Cc_fill%2Car_5%3A2%2Cw_1200%2Fbanner%2Fgeometry&w=3840&q=75"
          alt="courseimage "
        />
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="flex gap-4">
          <h4 className="mr-auto line-clamp-2 text-lg font-semibold">{title}</h4>
          <Bookmark className="shrink-0 text-gray-300" />
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
