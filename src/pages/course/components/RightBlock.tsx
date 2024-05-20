import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CourseData } from "@/types/course.types";
import {
  BarChart3,
  BookCheck,
  BookCopy,
  Component,
  FileText,
  History,
  LibraryBig,
  MessageSquareQuote,
  Star,
  Users,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

export const RightBlock = ({ course, styles }: { course: CourseData; styles: string }) => {
  const [tab, setTab] = useState("overview");

  const onTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <div className={`pl-3 sm:pl-7 ${styles}`}>
      <div className="mb-3 flex w-full flex-col gap-2 rounded-xl border-2 p-2 text-sm sm:mb-6 sm:rounded-2xl sm:p-4 sm:text-base">
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            <BookCheck strokeWidth={1.75} />
            <div className="font-semibold">Lecture Type</div>
          </div>
          <p className="font-thin capitalize">Pre-recorded</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            <BarChart3 strokeWidth={1.75} />
            <div className="font-semibold">Course level</div>
          </div>
          <p className=" font-thin capitalize	">{course.level.toLowerCase()}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            <Component strokeWidth={1.75} />
            <div className="font-semibold">Modules</div>
          </div>
          <p className="font-thin capitalize">{course.Module.length}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            {/* <BookText /> */}
            <LibraryBig strokeWidth={1.75} />
            <div className="font-semibold">Lessons</div>
          </div>
          <p className="font-thin capitalize">{course.Module.length}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-between gap-3">
            <History strokeWidth={1.75} />
            <div className="font-semibold">Last update</div>
          </div>
          <p className="font-thin capitalize">
            {new Date(course.updatedAt).toLocaleString("default", {
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div>
        <Tabs
          value={tab}
          onValueChange={onTabChange}
          className="w-full rounded-xl border-2 px-3 py-2 sm:rounded-2xl sm:px-4"
        >
          <TabsList className="flex w-full justify-between gap-1 rounded-2xl bg-background p-0 sm:gap-2">
            <TabsTrigger
              className="shrink grow border-2 text-foreground hover:bg-[#edf1f2] data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-[#edf1f2] dark:hover:bg-gray-800 data-[state=active]:dark:bg-gray-800 "
              value="overview"
            >
              <FileText className="mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="grow border-2  text-foreground hover:bg-[#edf1f2] data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-[#edf1f2] dark:hover:bg-gray-800  data-[state=active]:dark:bg-gray-800"
              value="tutors"
            >
              <UsersRound className="mr-2" />
              Tutors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="py-3">
            <div>
              <div className="mb-3 flex  items-center gap-2">
                <div className="flex overflow-hidden">
                  <p className="mr-1 line-clamp-1 break-words text-gray-500">Course by</p>
                  <p
                    onClick={() => setTab("tutors")}
                    className="cursor-pointer text-primary underline"
                  >
                    Nik Shipov
                  </p>
                </div>
              </div>
              <p className="mb-4 text-2xl font-semibold">{course.title}</p>
              <p className="  mb-4 text-gray-500">{course.description}</p>
              <div>
                <p className="mb-4 font-semibold">This course will have these modules: </p>
                <ul>
                  {course.Module.map((module, i) => (
                    <li key={module.id} className="mb-5 flex items-center">
                      <div className="relative z-10 mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-foreground bg-foreground/70 text-base font-bold  text-primary before:absolute before:left-[-5px] before:top-[5px] before:z-[-1] before:h-5 before:w-5 before:rounded-sm before:bg-foreground/70 before:shadow-sm before:shadow-foreground before:content-['']">
                        {i + 1}
                      </div>
                      {/* <p className="line-clamp-2 ">{module.title}</p> */}
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger>
                            <p
                              // onClick={() => {
                              //   handleLessonSelect(module.id, lesson.id);
                              // }}
                              className="line-clamp-2 text-left font-semibold text-gray-500 hover:text-primary"
                            >
                              {module.title}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-80 break-words ">{module.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tutors" className="px-2 py-3">
            <div>
              <div className="mb-3 items-start gap-2">
                <div className="mb-1 flex items-center overflow-hidden">
                  <p className="line-clamp-2 break-words text-2xl font-semibold ">Nik Shipov</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <img
                  className="h-28 w-28 shrink-0 rounded-full object-cover transition-all duration-300 hover:scale-105	"
                  src="https://source.unsplash.com/random"
                  alt="author image"
                />
                <div className="flex grow flex-col gap-2">
                  <div className="flex gap-2 transition-all">
                    <Star strokeWidth={1.5} className="text-primary" />{" "}
                    <p className="font-semibold">{(Math.random() * 1.5 + 3.5).toFixed(1) + " "}</p>
                    <p className="text-gray-500">ratings</p>
                  </div>
                  <div className="flex gap-2">
                    <MessageSquareQuote strokeWidth={1.5} className="text-primary" />

                    <p className="font-semibold">
                      {(Math.floor(Math.random() * 3_000) + 1).toLocaleString() + " "}
                    </p>
                    <p className="text-gray-500">feedbacks</p>
                  </div>
                  <div className="flex gap-2">
                    <Users strokeWidth={1.5} className="text-primary" />
                    <p className="font-semibold">
                      {(Math.floor(Math.random() * 300_000) + 1).toLocaleString() + " "}
                    </p>
                    <p className="text-gray-500">students</p>
                  </div>
                  <div className="flex gap-2">
                    <BookCopy strokeWidth={1.5} className="text-primary" />
                    <p className="font-semibold">
                      {(Math.floor(Math.random() * 30) + 1).toLocaleString() + " "}
                    </p>
                    <p className="text-gray-500">courses</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
