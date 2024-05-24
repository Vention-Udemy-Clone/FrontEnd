import { UseFormReturn } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useGenerateCourseDescription from "@/mutations/useGenerateCourseDescription";
import { useCreateCourse, useUpdateCourse } from "@/services/courses";
import { CourseRequest } from "@/types/course.types";
import { useState } from "react";
import { toast } from "sonner";
import { InputForm } from "./InputForm";

type Props = {
  form: UseFormReturn<CourseRequest>;
};

export const CourseForm = ({ form }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAiGenerationOpen, setIsAiGenerationOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { createCourse, status } = useCreateCourse();
  const { updateCourse } = useUpdateCourse();

  const { mutate } = useGenerateCourseDescription();

  const onSubmit = (data: CourseRequest) => {
    if (id) {
      updateCourse({ ...data, id });
    } else {
      createCourse(data);
    }
  };

  const handleAiGeneration = (data: { words: string }) => {
    if (!form.getValues("title")) {
      form.setError("title", {
        message: "Please provide title first",
        type: "validate",
      });
      form.setFocus("title");
      return;
    }
    setIsLoading(true);
    form.setValue("description", "Loading...");
    form.clearErrors("title");

    mutate(
      {
        title: form.getValues("title"),
        level: form.getValues("level"),
        words: +data.words || 50,
      },
      {
        onSuccess: (data) => {
          setIsLoading(false);

          form.setValue("description", data.data.description);
        },
        onError: () => {
          toast.error("Failed to generate description");
          form.setValue("description", "");
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>
                      <p>Course Description</p>
                    </FormLabel>
                    <InputForm
                      loading={isLoading}
                      open={isAiGenerationOpen}
                      setIsAiGenerationOpen={setIsAiGenerationOpen}
                      onSubmit={handleAiGeneration}
                      onCancel={() => {
                        setIsAiGenerationOpen(false);
                      }}
                      onClear={() => {
                        form.setValue("description", "");
                      }}
                    />
                  </div>
                  <FormControl>
                    <Textarea disabled={isLoading} rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={status === "pending"}>
                {id ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
