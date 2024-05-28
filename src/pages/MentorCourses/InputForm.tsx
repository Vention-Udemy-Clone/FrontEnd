import { CheckIcon, Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  onSubmit: (value: { words: string }) => void;
  onCancel: () => void;
  onClear: () => void;
  loading: boolean;
  open: boolean;
  setIsAiGenerationOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputForm = ({
  onSubmit,
  onCancel,
  onClear,
  loading,
  open,
  setIsAiGenerationOpen,
}: Props) => {
  const [value, setValue] = useState("50");
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  return (
    <div>
      {open ? (
        <div className="flex h-7 items-center justify-between gap-2 ">
          <p className="text-sm">words</p>
          <Input
            className="h-7 w-20 p-1"
            type="number"
            required
            value={value}
            placeholder="50-..."
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div className="flex items-center gap-1">
            <Button
              disabled={loading}
              className="h-7"
              variant="outline"
              size="icon"
              type="button"
              onClick={() => {
                if (parseInt(value) < 50 || value === "") {
                  setValue("50");
                  onSubmit({ words: "50" });
                  return;
                }
                onSubmit({ words: value });
                if (!hasBeenClicked) {
                  setHasBeenClicked(true);
                }
              }}
            >
              {hasBeenClicked ? <ReloadIcon /> : <CheckIcon />}
            </Button>
            {hasBeenClicked && (
              <Button
                disabled={loading}
                className="mr-3 h-7"
                size="icon"
                type="button"
                variant="outline"
                onClick={onClear}
              >
                <Trash2 size={14} />
              </Button>
            )}

            <Button
              disabled={loading}
              className="h-7"
              size="icon"
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              <Cross2Icon />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          disabled={loading}
          className="h-7 border text-primary hover:bg-primary hover:text-white"
          variant={"outline"}
          type="button"
          onClick={() => {
            setIsAiGenerationOpen(true);
          }}
        >
          Generate by AI
        </Button>
      )}
    </div>
  );
};
