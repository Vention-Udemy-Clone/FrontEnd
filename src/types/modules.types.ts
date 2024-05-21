import { z } from "zod";

export const moduleSchema = z.object({
  title: z.string().min(3, "Must be at least 3 characters"),
});

export type ModuleRequest = z.infer<typeof moduleSchema>;
