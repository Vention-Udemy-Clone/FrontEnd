import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Module } from "@/types/course.types";

export const LeftBlock = ({ modules }: { modules: Module[] }) => {
  console.log("file: LeftBlock.tsx:31 ~ LeftBlock ~ modules:", modules[0]);

  return (
    <div className="h-screen  w-3/12	max-w-[350px] bg-yellow-200">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Left Block</h2>
        <p>This is the left block content.</p>
      </div>
      {modules.map((module) => (
        <Accordion key={module.id} type="single" defaultValue={modules[0].id} collapsible>
          <AccordionItem value={modules[0].id === module.id ? modules[0].id : module.id}>
            <AccordionTrigger>{module.title}</AccordionTrigger>
            <AccordionContent>
              {module.Lesson.map((lesson) => (
                <div key={lesson.id} className="mb-2">
                  <p>{lesson.title}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
