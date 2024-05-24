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
import { cn } from "@/lib/utils";
import { useGetMyCourse } from "@/services/courses";
import { useDeleteModule } from "@/services/modules/useDeleteModule";
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
                    <div className="flex">
                      <Button
                        variant="outline"
                        className="w-full text-primary hover:text-primary"
                        onClick={() => setModuleCreation(true)}
                      >
                        Add Module
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
                        <div className="flex items-center justify-between p-1">
                          <AccordionTrigger
                            noIcon
                            className="px-2 py-0 text-start  hover:no-underline"
                          >
                            {content.title} {`(${content.lessons.length})`}
                          </AccordionTrigger>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-accent">
                              <DotsHorizontalIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setModuleEdit(content.id)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteModule(content.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <AccordionContent className="px-3">
                          <div className="flex">
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
                          <ul className="mt-1 space-y-2 py-1">
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
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
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