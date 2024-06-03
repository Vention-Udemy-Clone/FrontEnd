import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGenerateLearningPath from "@/mutations/useGenerateLearningPath";
import { Level } from "@/types/course.types";
import { useState } from "react";
import { GeneratedContent } from "./generated-content";
import { Plus, RotateCcw, WandSparkles } from "lucide-react";

const STUDENT_LEVELS = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED] as const;

export function LearningPath() {
  const { data, isPending, mutate } = useGenerateLearningPath();

  const [level, setLevel] = useState(Level.BEGINNER);
  const [stack, setStack] = useState("");
  const [modalOpen, setModalOpen] = useState(!data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stack) {
      mutate({ stack, level });
      setStack("");
      setModalOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div>
              <Label htmlFor="learning-path-input">What do you want to learn?</Label>
              <Input
                onChange={(e) => {
                  setStack(e.target.value);
                }}
                className="mt-1"
                type="text"
                id="learning-path-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="learning-path-select">Select your level</Label>
              <Select value={level} onValueChange={(value) => setLevel(value as Level)}>
                <SelectTrigger id="learning-path-select" className="mt-1 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STUDENT_LEVELS.map((level) => (
                    <SelectItem value={level} key={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Generate</Button>
          </form>
        </DialogContent>
      </Dialog>

      {isPending && (
        <p className="flex h-full animate-pulse items-center justify-center gap-4 text-sm text-primary">
          Generating learning path... <WandSparkles className="text-primary" size={"18px"} />
        </p>
      )}

      {data && (
        <Button
          onClick={() => setModalOpen(true)}
          variant={"outline"}
          className="ml-auto mr-4 block text-gray-400 hover:text-primary"
        >
          <RotateCcw />
        </Button>
      )}

      <div className="grow">
        {data && <GeneratedContent pathResponse={data} />}

        {!data && !isPending && (
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <p className="w-[350px] text-center text-gray-400">
              Generate a learning path based on your interests and level.
            </p>

            <Button
              className="rounded-lg px-4 py-6 text-gray-600 hover:text-primary"
              onClick={() => setModalOpen(true)}
              variant={"outline"}
            >
              <Plus size={"30px"} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
