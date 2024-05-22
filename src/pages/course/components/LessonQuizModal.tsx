import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QuizData } from "./MiddleBlock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface QuizProps {
  quizData: QuizData[] | null;
}

const LessonQuizModal = (props: QuizProps) => {
  
  // const [expandAnswer, setExpandAnswer] = useState(null as number | null);
  const { quizData } = props;

  return (
    // <>
    //     {quizData && quizData.map((question, index) => (
    //       <div key={index}>
    //         <h2>{question.question}</h2>
    //         <button onClick={() => setExpandAnswer(index)}>
    //           {expandAnswer === index ? 'Hide Answer' : 'Show Answer'}
    //         </button>
    //         {expandAnswer === index && <p>{question.answer}</p>}
    //       </div>
    //     ))}
    //     <button>Close</button>
    // </>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Self-Quiz</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Self-Quiz</DialogTitle>
          <DialogDescription>
            Try to answer the following questions to test your knowledge. Answers are hidden by default. Click on the question to reveal the answer.
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {quizData && quizData.map((question, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger key={index}>{question.question}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
          </AccordionItem>
          ))}
        </Accordion>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LessonQuizModal