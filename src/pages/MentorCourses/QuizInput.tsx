import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useRegenerateQuizMutation from "@/mutations/useGetQuizMutation";
import { QuizDataResponse } from "@/types/lessons.types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/react-tooltip";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface QuizInputProps {
  maxQuestions?: number;
  onChange: (quizPairs: QuizPair[]) => void;
  lessonID: string;
  quizPairs: QuizPair[];
  setQuizPairs: React.Dispatch<React.SetStateAction<QuizPair[]>>;
  quiz: QuizDataResponse | undefined;
}

export interface QuizPair {
  question: string;
  answer: string;
}

const quizInitialState = [
  {
    question: "",
    answer: "",
  },
];

const QuizInput: React.FC<QuizInputProps> = ({
  maxQuestions = 5,
  onChange,
  lessonID,
  quizPairs,
  setQuizPairs,
  quiz,
}) => {
  const [isQuizLoading, setIsQuizLoading] = useState(false);
  const [isAIGenerationOpen, setIsAIGenerationOpen] = useState(false);

  useEffect(() => {
    setQuizPairs(quizInitialState);
  }, [setQuizPairs, lessonID]);

  useEffect(() => {
    if (quiz) {
      setQuizPairs(quiz.content);
    }
  }, [quiz, setQuizPairs]);

  const handleAddQuizPair = () => {
    if (quizPairs.length < maxQuestions) {
      const newQuizPairs = [...quizPairs, { question: "", answer: "" }];
      setQuizPairs(newQuizPairs);
      onChange(newQuizPairs);
    }
  };

  const handleDeleteQuizPair = (index: number) => {
    const newQuizPairs = quizPairs.filter((_, i) => i !== index);
    onChange(newQuizPairs);
    if (newQuizPairs.length === 0) {
      setQuizPairs(quizInitialState);
      return;
    }
    setQuizPairs(newQuizPairs);
  };

  const handleInputChange = (index: number, key: keyof QuizPair, value: string) => {
    const newQuizPairs = [...quizPairs];
    newQuizPairs[index][key] = value;
    setQuizPairs(newQuizPairs);
    onChange(newQuizPairs);
  };

  const regenerateQuizMutation = useRegenerateQuizMutation(lessonID);

  const handleGenerateQuiz = async () => {
    setIsAIGenerationOpen(true);
    setIsQuizLoading(true);
    try {
      const newQuizData = await regenerateQuizMutation.mutateAsync();
      setQuizPairs(newQuizData);
      onChange(newQuizData);
    } catch (error) {
      console.error(error);
      setQuizPairs([]);
    } finally {
      setIsQuizLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {isAIGenerationOpen ? (
          <div className="flex items-center gap-1">
            <Button
              disabled={isQuizLoading}
              className="h-7"
              variant="outline"
              size="icon"
              type="button"
              onClick={handleGenerateQuiz}
            >
              <ReloadIcon />
            </Button>

            <Button
              disabled={isQuizLoading}
              className="h-7"
              size="icon"
              type="button"
              variant="outline"
              onClick={() => {
                setQuizPairs(quizInitialState);
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ) : (
          <Button variant={"outline"} onClick={handleGenerateQuiz} disabled={isQuizLoading}>
            {isQuizLoading ? "Generating..." : "Generate by AI"}
          </Button>
        )}
      </div>
      {quizPairs &&
        quizPairs.map((pair, index) => (
          <div className="my-4 text-sm ">
            {isQuizLoading ? (
              <Skeleton className="m-1 mb-2 h-44" />
            ) : (
              <div key={index} className="rounded-lg border  p-2 shadow">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm text-muted-foreground">Question {index + 1}</Label>
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={isQuizLoading}
                          size={"icon"}
                          variant={"ghost"}
                          onClick={() => handleDeleteQuizPair(index)}
                        >
                          <Minus />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-80	break-words">Delete this question</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Textarea
                  disabled={isQuizLoading}
                  placeholder={`Question goes here`}
                  value={pair.question}
                  onChange={(e) => handleInputChange(index, "question", e.target.value)}
                  className="mb-2 h-full flex-1 "
                />
                <Label className="mb-2 text-sm text-muted-foreground">Answer</Label>

                <Textarea
                  rows={3}
                  disabled={isQuizLoading}
                  placeholder={`And answer here `}
                  value={pair.answer}
                  onChange={(e) => handleInputChange(index, "answer", e.target.value)}
                  className="h-full flex-1"
                />
              </div>
            )}
          </div>
        ))}
      {quizPairs.length < maxQuestions && (
        <TooltipProvider delayDuration={400}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={"outline"}
                className="w-full"
                onClick={handleAddQuizPair}
              >
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-80	break-words">Add new question</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default QuizInput;
