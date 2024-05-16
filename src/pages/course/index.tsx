import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useGetCourseQuery from "@/queries/course/useGetCourseQuery";
import { useParams } from "react-router-dom";
import { LeftBlock } from "./components/LeftBlock";
import { MiddleBlock } from "./components/MiddleBlock";
import { RightBlock } from "./components/RightBlock";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "@radix-ui/react-icons";

export const CoursePage = () => {
  const { id: courseId } = useParams();

  const { isPending, data, isError } = useGetCourseQuery(courseId as string);

  console.log("file: index.tsx:23 ~ CoursePage ~ data:", data);

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error...</div>;
  return (
    <>
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <HomeIcon />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${courseId}`}>
                {data.title.split(" ").slice(0, 5).join(" ")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </>
      <div className="relative flex flex-wrap">
        <div className="block sm:hidden">
          <Drawer direction="left">
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent className="h-screen w-[500px]">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <LeftBlock modules={data.Module} />
        <MiddleBlock />
        <RightBlock />
      </div>
    </>
  );
};
