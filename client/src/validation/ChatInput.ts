import { z } from "zod";

export const UserPrompt = z.object({
  input: z.string().min(1).trim(),
});
