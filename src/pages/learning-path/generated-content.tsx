import { LearningPathResponse } from "@/types/learning-path.types";
import { Separator } from "@/components/ui/separator";
import { Frown, Link2Off, Sparkles, WandSparkles } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";

export function GeneratedContent({ pathResponse }: { pathResponse: LearningPathResponse["data"] }) {
  const { selectedCourses, recommendations } = pathResponse;

  if (selectedCourses.length === 0 && recommendations.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1">
        <Link2Off className="mb-2 text-primary" size={"36px"} />
        <p>Unknown error occurred while generating the learning path.</p>
        <p>Try to search for another topic.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      {selectedCourses.length > 0 ? (
        <>
          <p className="flex items-center gap-4 text-xl font-bold">
            Courses <WandSparkles className="text-primary" size={"18px"} />
          </p>
          <p className="mb-6 mt-1 text-sm text-gray-400">
            Here is the list of the courses that are available in our resource:
          </p>
          <ul className="flex list-inside list-disc flex-col gap-4">
            {selectedCourses.map((course) => (
              <div className="flex items-center gap-4 font-semibold text-primary">
                <li key={course.id}>
                  <Link
                    to={`/course/${course.id}`}
                    target="_blank"
                    className="text-black underline hover:text-primary dark:text-white"
                  >
                    {course.title}
                  </Link>
                </li>
                <Separator className="h-4" orientation="vertical" />
                <span
                  className={clsx("rounded-sm bg-primary px-2 py-1 text-[10px] text-background", {
                    "bg-teal-500": course.level === "BEGINNER",
                    "bg-sky-500": course.level === "INTERMEDIATE",
                    "bg-violet-500": course.level === "ADVANCED",
                  })}
                >
                  {course.level}
                </span>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="flex items-center gap-4 text-xl font-bold">
            No such courses <Frown className="text-primary" size={"20px"} />
          </p>
          <p className="mb-6 mt-1 text-sm text-gray-400">
            Unfortunately, we couldn't find any courses that match your criteria. But we got nice
            recommendations for you!
          </p>
        </>
      )}

      {recommendations.length > 0 && (
        <>
          <Separator className="my-8" />

          <div>
            <h2 className="flex items-center gap-4  text-xl font-bold">
              We also recommend <Sparkles className="text-primary" size={"20px"} />
            </h2>
            <p className="mb-6 mt-1 text-sm text-gray-400">
              Besides technical skills, you should also consider improving your soft skills, here
              are some recommendations from us:
            </p>

            <ul className="flex list-inside list-decimal flex-col gap-4">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-primary">
                  <span className="text-sm text-black dark:text-white">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
