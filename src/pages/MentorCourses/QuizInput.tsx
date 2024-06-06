import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import useRegenerateQuizMutation from '@/mutations/useGetQuizMutation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QuizInputProps {
  maxQuestions?: number;
  onChange: (quizPairs: QuizPair[]) => void;
  lessonID: string;
  quizPairs: QuizPair[];
  setQuizPairs: React.Dispatch<React.SetStateAction<QuizPair[]>>;
}

export interface QuizPair {
  question: string;
  answer: string;
}

const QuizInput: React.FC<QuizInputProps> = ({ maxQuestions = 5, onChange, lessonID, quizPairs, setQuizPairs }) => {

  const handleAddQuizPair = () => {
    if (quizPairs.length < maxQuestions) {
      const newQuizPairs = [...quizPairs, { question: '', answer: '' }];
      setQuizPairs(newQuizPairs);
      onChange(newQuizPairs);
    }
  };

  const handleDeleteQuizPair = (index: number) => {
    const newQuizPairs = quizPairs.filter((_, i) => i !== index);
    setQuizPairs(newQuizPairs);
    onChange(newQuizPairs);
  };

  const handleInputChange = (index: number, key: keyof QuizPair, value: string) => {
    const newQuizPairs = [...quizPairs];
    newQuizPairs[index][key] = value;
    setQuizPairs(newQuizPairs);
    onChange(newQuizPairs);
  };

  const regenerateQuizMutation = useRegenerateQuizMutation(lessonID);

  const handleGenerateQuiz = async () => {
    try {
      const newQuizData= await regenerateQuizMutation.mutateAsync();
      setQuizPairs(newQuizData);
      onChange(newQuizData);
    } catch (error) {
      console.error(error);
      setQuizPairs([]);
    }
  }    

  return (
    <div>
      <Button variant={'outline'} onClick={handleGenerateQuiz} disabled={false}>  
        {/* {isQuizLoading ? 'Generating...' : 'Generate by AI'} */}
        Generate by AI
      </Button>
      {quizPairs && quizPairs.map((pair, index) => (
        <div key={index} >
          <Label>Question {index + 1}</Label>
          <Button variant="outline" onClick={() => handleDeleteQuizPair(index)}>x</Button>
          <Input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={pair.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            className="flex-1"
          />
          <Label>Answer</Label>
          <Input
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={pair.answer}
            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
            className="flex-1"
          />
        </div>
      ))}
      {quizPairs.length < maxQuestions && (
        <Button variant={'outline'} onClick={handleAddQuizPair}>Add question</Button>
      )}
    </div>
  );
};

export default QuizInput;
