import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { CourseData, CourseRequest, courseSchema, Level, Status } from "@/types/course.types";
import { CourseForm } from "./CourseForm";

type Props = {
  courseData?: CourseData;
};

export const CourseContent = ({ courseData }: Props) => {
  const user = useUserStore((state) => state.user);

  const form = useForm<CourseRequest>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: courseData?.title || "",
      description: courseData?.description || "",
      level: Level.BEGINNER,
      status: Status.DRAFT,
      authorId: user?.id || "",
      bgImageUrl: courseData?.bgImageUrl || "",
    },
    values: courseData ? { ...courseData, authorId: user.id } : undefined,
  });

  const course = {
    id: "1",
    title: form.watch("title") || "Course Title",
    description: form.watch("description") || "Course Description",
    bgImageUrl: form.watch("bgImageUrl") || "",
    level: form.watch("level"),
    status: form.watch("status"),
    Module: [],
    authorId: user?.id || "",
    author: {
      id: user?.id || "",
      email: user?.email || "",
      fullName: user?.fullName || "",
      avatarUrl: user?.avatarUrl || "",
    },
    createdAt: "2021-09-01T00:00:00.000Z",
    updatedAt: "2021-09-01T00:00:00.000Z",
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr,1fr]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Link to="/my-courses">
            <Button size="icon" variant="outline" className="rounded-full hover:border-primary">
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-primary">Details</h2>
          {/* Status */}
          <div></div>
        </div>
        <CourseForm form={form} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="py-1.5 text-primary">Preview</h2>
        <CourseCard course={course} noHover />
      </div>
    </div>
  );
};
