import { BookmarkIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Course } from "@/types/course.types";
import clsx from "clsx";

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
    bgImageUrl,
  } = course;

  return (
    <div
      className={cn(
        "mx-auto flex min-h-96 max-w-[400px] flex-col overflow-hidden rounded-lg border bg-background transition-all sm:mx-0 sm:max-w-none",
        { "h-full hover:-translate-y-2 hover:cursor-pointer hover:shadow-md": !noHover }
      )}
    >
      <div>
        <img
          alt="courseImage "
          className="h-40 w-full object-cover"
          src={
            bgImageUrl ||
            "https://jakeer.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fjakeer-cloudinary%2Fimage%2Fupload%2Fq_50%2Cf_auto%2Cc_fill%2Car_5%3A2%2Cw_1200%2Fbanner%2Fgeometry&w=3840&q=75"
          }
        />
      </div>

      <div className="flex flex-grow flex-col justify-between p-4">
        <div className="flex items-center gap-4">
          <h4 className="mr-auto line-clamp-2 text-lg font-semibold">{title}</h4>
          <BookmarkIcon className="h-5 w-5 text-gray-300" />
        </div>

        <div className="flex-grow pb-6 pt-3">
          <p className="line-clamp-3 break-all text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="authorImage"
              src={avatarUrl || "https://picsum.photos/200"}
              className="h-8 w-8 shrink-0 rounded-full"
            />
            <div className="overflow-hidden">
              <p className="line-clamp-1 break-words text-sm/4 text-gray-500">{fullName}</p>
            </div>
          </div>

          <p
            className={clsx("ml-auto rounded-sm bg-primary px-2 py-1 text-[10px] text-background", {
              "bg-teal-500": level === "BEGINNER",
              "bg-sky-500": level === "INTERMEDIATE",
              "bg-violet-500": level === "ADVANCED",
            })}
          >
            {level}
          </p>
        </div>
      </div>
    </div>
  );
};
