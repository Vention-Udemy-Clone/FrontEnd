import { zodResolver } from "@hookform/resolvers/zod";
import { DotIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGenerateCourse } from "@/services/courses";
import { useUserStore } from "@/store/userStore";
import { GenerateCourseRequest, generateCourseSchema } from "@/types/course.types";

export const GenerateCourse = () => {
  const user = useUserStore((state) => state.user);
  const { generateCourse, status, generatedCourse } = useGenerateCourse();
  const form = useForm<GenerateCourseRequest>({
    resolver: zodResolver(generateCourseSchema),
    defaultValues: {
      title: "",
      authorId: user.id,
    },
  });

  console.log("generatedCourse", generatedCourse);

  const onSubmit = (data: GenerateCourseRequest) => {
    generateCourse(data);
  };

  return (
    <div className="mb-32 flex flex-1 items-center justify-center">
      <Form {...form}>
        {status === "pending" ? (
          // Skeleton
          <p className="animate-pulse text-center text-sm text-primary">Generating course...</p>
        ) : status === "success" ? (
          generatedCourse && (
            <div className="w-3/4 space-y-4">
              <h2 className="text-center font-bold text-primary">{generatedCourse.title}</h2>
              <div className="flex flex-col items-center gap-2">
                <h3 className="ml-6 self-start text-sm font-bold text-primary">Description:</h3>
                <p className="w-11/12 rounded border p-3 text-sm text-muted-foreground">
                  {generatedCourse.description}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="ml-6 self-start text-sm font-bold text-primary">
                  Modules and Lessons:
                </h3>
                <Accordion type="single" collapsible className="w-4/5 space-y-1 p-1">
                  {generatedCourse.Module.map((module) => (
                    <AccordionItem key={module.id} value={module.id} className="rounded-md border">
                      <div className="flex items-center justify-between p-1">
                        <AccordionTrigger className="px-2 py-1.5 text-start  hover:no-underline">
                          {module.title} {`[${module.Lesson.length}]`}
                        </AccordionTrigger>
                      </div>
                      <AccordionContent className="px-6">
                        <ul className="space-y-2 py-1">
                          {module.Lesson.map((lesson) => (
                            <li key={lesson.id} className="flex items-center gap-2">
                              <DotIcon className="inline h-3 w-3" />
                              {lesson.title}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link to="/my-courses">
                  <Button variant="outline">Back</Button>
                </Link>
                <Link to={`/my-courses/${generatedCourse.id}`}>
                  <Button>Go to course</Button>
                </Link>
              </div>
            </div>
          )
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-2">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input autoFocus className="min-w-[400px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">Generate</Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};
