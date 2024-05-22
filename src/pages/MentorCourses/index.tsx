import { PlusIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import { CourseCard } from "@/components/course-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useGetMyCourses } from "@/services/courses/useGetMentorCourses";
import { useUserStore } from "@/store/userStore";

const MentorCourses = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading } = useGetMyCourses(user.id);

  // ! Make a Skeleton component to show a loading state
  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  const { data: courses } = data;

  return (
    <div className="container">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Courses</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mt-4 text-center text-xl font-medium text-primary">My Courses</h1>
      <Separator className="my-4" />
      <div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="create"
            className="flex min-h-80 flex-col items-center justify-center rounded border border-primary p-4 text-primary hover:border-primary"
          >
            <PlusIcon className="mr-2 h-6 w-6" />
            <span>Create a Course</span>
          </Link>
          {courses.map((course) => (
            <Link key={course.id} to={course.id}>
              <CourseCard course={course} key={course.id} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorCourses;
