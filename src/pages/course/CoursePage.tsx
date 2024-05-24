import { CircleX, Expand, Home, PanelRightClose, PanelRightOpen, Shrink } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useGetCourseQuery from "@/queries/course/useGetCourseQuery";
import { LeftBlock } from "./components/LeftBlock";
import { MiddleBlock } from "./components/MiddleBlock";
import { RightBlock } from "./components/RightBlock";

export const CoursePage = () => {
  const { id: courseId } = useParams();
  const [showPanels, setPanels] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLessonAndModule, setActiveLessonAndModule] = useState({
    moduleNum: "",
    lessonNum: "",
  });
  const [searchParams, setSearchParams] = useSearchParams({ showPanels: "true" });

  const searchParamsAsObject = useMemo(() => {
    const values: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      values[key] = value;
    }

    return values;
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(searchParamsAsObject);
    setPanels(searchParamsAsObject.showPanels === "true");
  }, [searchParamsAsObject, setSearchParams, showPanels]);

  const { isPending, data, isError } = useGetCourseQuery(courseId as string);

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;
  return (
    <>
      <div className="mb-4 mr-5 flex items-start justify-between">
        <Breadcrumb className="max-[1100px]:ml-7">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home size={20} />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${courseId}`}>
                {data?.title.split(" ").slice(0, 5).join(" ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                Module {activeLessonAndModule.moduleNum || 1} • Lesson{" "}
                {activeLessonAndModule.lessonNum || 1}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          {showPanels ? (
            <Expand
              onClick={() => {
                setPanels((prev) => !prev);
                const newSearchParams = new URLSearchParams({ showPanels: "false" });
                setSearchParams(newSearchParams);
              }}
              className="cursor-pointer"
            />
          ) : (
            <Shrink
              onClick={() => {
                setPanels((prev) => !prev);
                const newSearchParams = new URLSearchParams({ showPanels: "true" });
                setSearchParams(newSearchParams);
              }}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap">
        {showPanels && (
          <>
            <LeftBlock
              setActiveLessonAndModule={setActiveLessonAndModule}
              modules={data.Module}
              courseId={courseId as string}
              styles={"w-4/12 max-w-[360px] max-[1100px]:hidden"}
              setLeftBlockOpen={setOpen}
            />
            <Drawer
              handleOnly={true}
              open={open}
              disablePreventScroll={true}
              direction="left"
              onOpenChange={setOpen}
            >
              <DrawerTrigger className="hidden max-[1100px]:block">
                <div className="fixed left-[12px] top-16 z-50 w-[19px] rotate-180 rounded-s-lg border-2 border-r-0 p-1 before:absolute before:bottom-full before:left-[17px] before:h-full before:w-[15px] before:rounded-br-full before:border-2 before:border-l-0 before:border-t-0  before:border-border before:content-[''] after:absolute after:left-[17px] after:top-full after:h-full after:w-[15px] after:rounded-tr-full after:border-2 after:border-b-0 after:border-l-0 after:border-border  after:content-['']  ">
                  <PanelRightOpen />
                </div>
              </DrawerTrigger>
              <DrawerContent className="left-0 right-auto h-screen w-[500px] rounded-s-2xl border-2 pb-2 pt-3 max-[600px]:w-[400px] max-[500px]:w-full max-[500px]:rounded-none max-[500px]:border-none max-[500px]:pt-10">
                <div className="overflow-auto">
                  <div className="absolute left-2 top-0 z-50 h-9 w-[95%] rounded-tl-3xl p-2"></div>
                  <LeftBlock
                    setActiveLessonAndModule={setActiveLessonAndModule}
                    modules={data.Module}
                    courseId={courseId as string}
                    styles={"block w-full max-w-[500px] pl-3 overflow-auto"}
                    setLeftBlockOpen={setOpen}
                  />
                </div>

                <DrawerClose asChild>
                  <div className="cursor-pointer ">
                    <div className="absolute -right-[3px] top-[50px] z-50 h-[80px] w-[5px] cursor-pointer bg-background max-[500px]:hidden"></div>
                    <div className="absolute -right-[34px] top-16 z-50 w-[19px] rotate-180 cursor-pointer rounded-s-lg border-2 border-r-0 p-1 before:absolute before:bottom-full before:left-[17px] before:h-full before:w-[15px] before:rounded-br-full before:border-2 before:border-l-0 before:border-t-0 before:border-border  before:content-[''] after:absolute after:left-[17px] after:top-full after:h-full after:w-[15px] after:rounded-tr-full after:border-2 after:border-b-0 after:border-l-0 after:border-border after:content-[''] max-[500px]:hidden">
                      <PanelRightClose />
                    </div>

                    <div className="absolute left-2 top-0 z-50 hidden rounded-tl-3xl p-2 max-[500px]:block">
                      <CircleX size={30} />
                    </div>
                  </div>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </>
        )}
        <MiddleBlock activeLessonAndModule={activeLessonAndModule} />
        {showPanels && (
          <>
            <RightBlock styles={" w-4/12 max-w-[380px] max-[1400px]:hidden "} course={data} />
            <Drawer handleOnly={true} disablePreventScroll={true} direction="right">
              <DrawerTrigger className="hidden max-[1400px]:block">
                <div className="fixed right-[12px] top-16 z-50 w-[19px] rounded-s-lg border-2 border-r-0 p-1 before:absolute before:bottom-full before:left-[17px] before:h-full before:w-[15px] before:rounded-br-full before:border-2 before:border-l-0 before:border-t-0  before:border-border before:content-[''] after:absolute after:left-[17px] after:top-full after:h-full after:w-[15px] after:rounded-tr-full after:border-2 after:border-b-0 after:border-l-0 after:border-border  after:content-['']  ">
                  <PanelRightOpen />
                </div>
              </DrawerTrigger>
              <DrawerContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="left-auto right-0 h-screen w-[500px] rounded-s-2xl border-2 pb-2 pt-3 max-[600px]:w-[400px] max-[500px]:w-full max-[500px]:rounded-none max-[500px]:border-none max-[500px]:pt-10"
              >
                <div className="overflow-auto">
                  <div className="absolute left-2 top-0 z-50 h-9 w-[95%] rounded-tl-3xl p-2"></div>
                  <RightBlock
                    styles={"block w-full max-w-[500px] overflow-auto	pr-3 pt-3"}
                    course={data}
                  />
                </div>

                <DrawerClose asChild>
                  <div className="cursor-pointer">
                    <div className="absolute -left-[3px] top-[50px] z-50 h-[80px] w-[5px] cursor-pointer bg-background "></div>
                    <div className="absolute -left-[34px] top-16 z-50 w-[19px] cursor-pointer rounded-s-lg border-2 border-r-0 p-1 before:absolute before:bottom-full before:left-[17px] before:h-full before:w-[15px] before:rounded-br-full before:border-2 before:border-l-0 before:border-t-0 before:border-border  before:content-[''] after:absolute after:left-[17px] after:top-full after:h-full after:w-[15px] after:rounded-tr-full after:border-2 after:border-b-0 after:border-l-0 after:border-border after:content-[''] max-[500px]:hidden">
                      <PanelRightClose />
                    </div>

                    <div className="absolute left-2 top-0 z-50 hidden rounded-tl-3xl p-2  max-[500px]:block">
                      <CircleX size={30} />
                    </div>
                  </div>
                </DrawerClose>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};
