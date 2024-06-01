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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetMyCourses } from "@/services/courses/useGetMentorCourses";
import { useUserStore } from "@/store/userStore";

export const MentorCourses = () => {
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
          <div className="grid min-h-80 place-content-center gap-2 rounded border border-primary p-4">
            {/* Manual Creation */}
            <Link to="create" className="flex justify-center">
              <Button className="w-full">
                <span className="ml-2">Create course</span>
              </Button>
            </Link>
            {/* AI Generation */}
            <Link to="generate" className="flex justify-center">
              <Button className="w-full">
                <span className="ml-2">Generate course (AI)</span>
              </Button>
            </Link>
          </div>
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
