import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { QuizData } from "@/types/lesons.types";
import useRegenerateQuizMutation from "@/mutations/useGetQuizMutation";
import { useEffect, useState } from "react";
import useGetQuizQuery from "@/queries/course/useGetQuizQuery";

export interface QuizProps {
  lessonId: string;
}

const LessonQuizModal = (
  props: QuizProps
) => {
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
      quizData: data,
      isQuizLoading: isPending,
      isQuizError: isError,
    });
  }, [data, isPending, isError]);

  const regenerateQuizMutation = useRegenerateQuizMutation(lessonId);

  const handleRegenerateQuiz = async () => {
    setQuizState({ isQuizLoading: true, isQuizError: false, quizData: undefined });
    try {
      const newQuizData = await regenerateQuizMutation.mutateAsync();
      setQuizState({ quizData: newQuizData, isQuizLoading: false, isQuizError: false });
    } catch (error) {
      console.error(error);
      setQuizState({ quizData: undefined, isQuizLoading: false, isQuizError: true });
    }
  };

  const { quizData, isQuizLoading, isQuizError } = quizState;

  return (
    <Dialog>
      <DialogTrigger asChild>
          <div className="flex justify-end">
          <Button
            className="rounded-sm"
            variant={"default"}>
            Generate a Self-Quiz with AI
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Self-Quiz with AI</DialogTitle>
          <DialogDescription>
            Try to answer the following questions to test your knowledge. Answers are hidden by default. Click on the question to reveal the answer.
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {isQuizLoading && <span className=" min-w-[500px]">AI is generating quiz...</span>}
          {isQuizError && <span className=" min-w-[500px]">Error generating quiz. Please try again</span>}
          {quizData && quizData.map((question, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger key={index}>{question.question}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
          </AccordionItem>
          ))}
        </Accordion>
        <DialogFooter>
          <Button onClick={handleRegenerateQuiz}>Regenerate quiz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LessonQuizModal