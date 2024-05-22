import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Module } from "@/types/course.types";

import { useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const LeftBlock = ({
  modules,
  courseId,
  setActiveLessonAndModule,
  styles,
  setLeftBlockOpen,
}: {
  modules: Module[];
  courseId: string;
  setActiveLessonAndModule: React.Dispatch<
    React.SetStateAction<{ moduleNum: string; lessonNum: string }>
  >;
  setLeftBlockOpen: React.Dispatch<React.SetStateAction<boolean>>;
  styles: string;
}) => {
  const { lessonId, moduleId } = useParams();

  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const navigate = useNavigate();
  interface NavigateToLessonViewProps {
    navigate: NavigateFunction;
    courseId: string;
    moduleId: string;
    lessonId: string;
  }

  const navigateToLessonView = ({
    navigate,
    courseId,
    moduleId,
    lessonId,
  }: NavigateToLessonViewProps) => {
    const url = `/course/${courseId}/module/${moduleId}/lesson/${lessonId}?showPanels=true`;
    navigate(url);
  };

  const handleLessonSelect = useCallback(
    (moduleId: string, lessonId: string) => {
      return navigateToLessonView({
        navigate,
        courseId,
        moduleId,
        lessonId,
      });
    },
    [courseId, navigate]
  );

  const [selectedLesson, setSelectedLesson] = useState("");
  useEffect(() => {
    if (lessonId && moduleId) {
      handleLessonClick(lessonId);
      return;
    }

    handleLessonSelect(modules[0].id, modules[0].Lesson[0].id);
    handleLessonClick(modules[0].Lesson[0].id);
    setActiveLessonAndModule({ moduleNum: "1", lessonNum: "1" });
  }, [handleLessonSelect, lessonId, moduleId, modules, selectedLesson, setActiveLessonAndModule]);

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  return (
    <div className={`${styles}`}>
      {modules.map((module, i) => (
        <Accordion
          key={module.id}
          type="single"
          defaultValue={moduleId || modules[0].id}
          collapsible
        >
          <AccordionItem className="mb-2 rounded-xl border " value={module.id}>
            <AccordionTrigger className=" rounded-[16px] border-none px-2 py-3 hover:bg-[#edf1f2] hover:no-underline data-[state=open]:bg-[#edf1f2] dark:hover:bg-gray-800  data-[state=open]:dark:bg-gray-800">
              <div className="flex items-center justify-center gap-3 pl-2">
                <Checkbox
                  onClick={handleCheckboxClick}
                  className="h-9 w-9 rounded-full text-[50px]"
                />

                <div className="text-left">
                  <p className="text-xs text-gray-500"> Module {i}</p>
                  <p className="line-clamp-2 font-semibold">{module.title}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-5 pr-3 pt-4">
              {module.Lesson.map((lesson, lessonIndex) => (
                <div
                  key={lesson.id}
                  className="mb-4 flex items-center gap-6  last:[&_.custom-class]:before:content-['1']"
                >
                  <Checkbox
                    className={`${selectedLesson === lesson.id ? "border-2 border-dashed before:border-primary " : "before:border-gray-400"} custom-class relative h-5 w-5 rounded-full bg-background before:absolute before:left-1/2 before:top-[112%] before:h-10 before:border-collapse before:-translate-x-1/2 before:border-r-2 before:border-dotted  before:content-[''] `}
                  />

                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger>
                        <p
                          onClick={() => {
                            handleLessonSelect(module.id, lesson.id);
                            handleLessonClick(lesson.id);
                            setActiveLessonAndModule({
                              moduleNum: i + 1 + "",
                              lessonNum: lessonIndex + 1 + "",
                            });
                            setLeftBlockOpen(false);
                          }}
                          className={`${selectedLesson === lesson.id ? "text-primary " : ""} line-clamp-2 text-left font-semibold hover:text-primary`}
                        >
                          {lesson.title}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-80	break-words">{lesson.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
