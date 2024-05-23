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
  const [quizData, setQuizData] = useState<QuizData[] | undefined>(undefined);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean | undefined>(undefined);
  const [isQuizError, setIsQuizError] = useState<boolean | undefined>(undefined);

  useEffect(() => { 
    setQuizData(data);
    setIsQuizLoading(isPending);
    setIsQuizError(isError);
  }, [data, isPending, isError])

  const regenerateQuizMutation = useRegenerateQuizMutation(lessonId);

  const handleRegenerateQuiz = async () => {
    try {
      setQuizData(undefined);
      setIsQuizError(false);
      setIsQuizLoading(true);
      const newQuizData = await regenerateQuizMutation.mutateAsync();
      setQuizData(newQuizData);
      setIsQuizLoading(false);
    } catch (error) {
      setIsQuizLoading(false);
      setIsQuizError(true);
      console.error(error);
    }
  }

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
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Generate a Self-Quiz with AI</DialogTitle>
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