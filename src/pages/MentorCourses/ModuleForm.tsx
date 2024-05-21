import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateModule } from "@/services/modules/useCreateModule";
import { useUpdateModule } from "@/services/modules/useUpdateModule";
import { ModuleRequest, moduleSchema } from "@/types/modules.types";

type Props = {
  setModuleCreation: (value: boolean) => void;
  setModuleEdit?: (value: string) => void;
  moduleData?: ModuleRequest & { id: string };
};

export const ModuleForm = ({ moduleData, setModuleCreation, setModuleEdit }: Props) => {
  const { createModule } = useCreateModule();
  const { updateModule } = useUpdateModule();
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: moduleData?.title || "",
    },
  });

  const handleCancel = () => {
    setModuleCreation(false);
    form.reset();
    if (setModuleEdit) setModuleEdit("");
  };

  const onSubmit = (data: ModuleRequest) => {
    if (moduleData?.id) {
      updateModule({ ...data, id: moduleData.id }, { onSuccess: handleCancel });
    } else {
      createModule(data, { onSuccess: handleCancel });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-1">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full space-y-0">
              <FormLabel className="sr-only">Module title</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" type="submit">
            <CheckIcon />
          </Button>
          <Button size="icon" type="button" variant="outline" onClick={handleCancel}>
            <Cross2Icon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
