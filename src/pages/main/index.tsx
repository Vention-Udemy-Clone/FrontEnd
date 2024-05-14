import { CourseCard } from '@/components/course-card';

export const Main = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </>
  );
};
