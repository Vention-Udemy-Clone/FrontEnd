import { DotIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGenerateContent, useGetMyCourse } from "@/services/courses";
import { useDeleteModule } from "@/services/modules/useDeleteModule";
import { Level } from "@/types/course.types";
import { CourseContent } from "./CourseContent";
import { LessonContent } from "./LessonContent";
import { ModuleForm } from "./ModuleForm";

type Contents = {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
  }[];
};

export const MentorCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, status } = useGetMyCourse(id);
  const { deleteModule } = useDeleteModule();
  const { generateContent, status: contentStatus } = useGenerateContent();

  const [moduleCreation, setModuleCreation] = useState(false);
  const [moduleEdit, setModuleEdit] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [lessonCreation, setLessonCreation] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [contents, setContents] = useState<Contents[]>([]);

  useEffect(() => {
    if (data) {
      setContents(
        data?.data?.Module.map((module) => ({
          id: module.id,
          title: module.title,
          lessons: module.Lesson,
        }))
      );
    }
  }, [data?.data]);

  useEffect(() => {
    const moduleSkeleton = document.getElementById("module-skeleton");
    if (moduleSkeleton && contentStatus === "pending") {
      moduleSkeleton.scrollIntoView({ behavior: "smooth" });
    }
  }, [contentStatus]);

  return (
    <div className="container">
      <div className="space-y-4">
        <CourseContent courseData={status === "success" ? data?.data : undefined} />
        {id && (
          <div className="space-y-2">
            <h2 className="flex justify-center text-primary">Modules and Lessons</h2>
            <div className="grid min-h-64 grid-cols-1 gap-2 lg:grid-cols-[1fr,2fr]">
              {/* Modules */}
              <div className="rounded-md border p-1">
                {/* Module Creation */}
                <div className=" p-1">
                  {moduleCreation ? (
                    <ModuleForm setModuleCreation={setModuleCreation} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="w-full text-primary hover:text-primary"
                        onClick={() => setModuleCreation(true)}
                      >
                        Add Module
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-primary hover:text-primary"
                        onClick={() => {
                          generateContent({
                            id: id,
                            title: data?.data.title || "",
                            level: data?.data.level || ("BEGINNER" as Level),
                          });
                        }}
                        disabled={contentStatus === "pending"}
                      >
                        Generate Content
                      </Button>
                    </div>
                  )}
                </div>
                {/* Module List */}
                <Accordion type="single" collapsible defaultValue="0" className="space-y-1 p-1">
                  {contents?.map((content, idx) =>
                    content.id === moduleEdit ? (
                      <ModuleForm
                        key={content.id}
                        setModuleEdit={setModuleEdit}
                        setModuleCreation={setModuleCreation}
                        moduleData={{ id: content.id, title: content.title }}
                      />
                    ) : (
                      <AccordionItem
                        key={content.id}
                        value={String(idx)}
                        className="rounded-md border"
                      >
                        {/* <div className=" flex items-center justify-between rounded-md"> */}
                        <AccordionTrigger className="gap-2 rounded-md px-2 py-2 text-start hover:bg-[#edf1f2] hover:no-underline data-[state=open]:bg-[#edf1f2] dark:hover:bg-gray-800 data-[state=open]:dark:bg-gray-800">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md  hover:bg-accent">
                              <DotsHorizontalIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem onClick={() => setModuleEdit(content.id)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteModule(content.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {content.title}{" "}
                          {content.lessons.length !== 0 ? ` [${content.lessons.length}]` : ""}
                        </AccordionTrigger>
                        {/* </div> */}
                        <AccordionContent className="">
                          <ul className="mb-3 mt-1 space-y-2 px-3 py-1">
                            {content.lessons.map((lesson) => (
                              <li
                                key={lesson.id}
                                className={cn(
                                  "flex cursor-pointer items-center gap-2 hover:text-primary",
                                  lesson.id === selectedLessonId && "text-primary"
                                )}
                                onClick={() => {
                                  setLessonCreation(false);
                                  setSelectedModuleId(content.id);
                                  setSelectedLessonId(lesson.id);
                                }}
                              >
                                <DotIcon className="inline h-3 w-3" />
                                {lesson.title}
                              </li>
                            ))}
                          </ul>
                          <Separator className="mb-2" />
                          <div className="flex px-3">
                            <Button
                              variant="outline"
                              className="w-full text-primary hover:text-primary"
                              onClick={() => {
                                setLessonCreation(true);
                                setSelectedModuleId(content.id);
                                setSelectedLessonId("");
                              }}
                            >
                              {lessonCreation ? "Adding Lesson" : "Add Lesson"}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
                <div id="module-skeleton">
                  {contentStatus === "pending" &&
                    Array.from({ length: 3 }).map((_, idx) => (
                      <Skeleton key={idx} className="m-1 mb-2 h-10" />
                    ))}
                </div>
              </div>
              <LessonContent
                moduleId={selectedModuleId}
                lessonId={selectedLessonId}
                setLessonId={setSelectedLessonId}
                lessonCreation={lessonCreation}
                setLessonCreation={setLessonCreation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
