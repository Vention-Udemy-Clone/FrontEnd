import { BookmarkIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Course } from "@/types/course.types";

type Props = {
  course: Course;
  noHover?: boolean;
};

export const CourseCard = ({ course, noHover }: Props) => {
  const {
    level,
    title,
    description,
    author: { fullName, avatarUrl },
  } = course;

  return (
    <div
      className={cn(
        "mx-auto flex h-full max-w-[400px] flex-grow flex-col overflow-hidden rounded-lg border bg-background transition-all sm:mx-0 sm:max-w-none",
        { "hover:-translate-y-2 hover:cursor-pointer hover:shadow-md": !noHover }
      )}
    >
      <div>
        <img
          alt="courseimage "
          className="h-40 w-full object-cover"
          src="https://jakeer.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fjakeer-cloudinary%2Fimage%2Fupload%2Fq_50%2Cf_auto%2Cc_fill%2Car_5%3A2%2Cw_1200%2Fbanner%2Fgeometry&w=3840&q=75"
        />
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="flex gap-4">
          <h4 className="mr-auto line-clamp-2 text-lg  font-semibold">{title}</h4>
          <BookmarkIcon className="h-5 w-5 text-gray-300" />
        </div>

        <p className="mb-10 mt-3 line-clamp-3 flex-grow break-all text-sm text-gray-600">
          {description}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="authorimage"
              src={avatarUrl || "https://picsum.photos/200"}
              className="h-8 w-8 shrink-0 rounded-full"
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
