import { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetQuizQuery from "@/queries/course/useGetQuizQuery";
import { QuizData } from "@/types/lessons.types";

export interface QuizProps {
  lessonId: string;
}

const LessonQuizModal = (props: QuizProps) => {
  const { lessonId } = props;
  const { data, isPending, isError } = useGetQuizQuery(lessonId as string);
  const [quizState, setQuizState] = useState<{
    quizData?: QuizData[];
    isQuizLoading: boolean;
    isQuizError: boolean;
  }>({
    quizData: undefined,
    isQuizLoading: false,
    isQuizError: false,
  });

  useEffect(() => {
    setQuizState({
      quizData: data?.content,
      isQuizLoading: isPending,
      isQuizError: isError,
    });
  }, [data, isPending, isError]);

  const { quizData } = quizState;

  return (
    quizState.quizData && (
      <Dialog>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button
              className="rounded-sm border-primary text-primary hover:text-primary"
              size={"sm"}
              variant={"outline"}
            >
              Self quiz
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="lg:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Self-Quiz </DialogTitle>
            <DialogDescription>
              Try to answer the following questions to test your knowledge. Answers are hidden by
              default. Click on the question to reveal the answer.
            </DialogDescription>
          </DialogHeader>
          <Accordion type="single" collapsible className="w-full">
            {quizData &&
              quizData.map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger key={index}>
                    <span className="text-start">{question.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>{question.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </DialogContent>
      </Dialog>
    )
  );
};

export default LessonQuizModal;
