import { Link } from "react-router-dom";

import { CourseCard } from "@/components/course-card";
import { useListCoursesQuery } from "@/queries/course/useListCoursesQuery";

export const Main = () => {
  const { data, isLoading } = useListCoursesQuery();

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  const { data: courses } = data;

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`}>
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </>
  );
};
