import * as z from "zod";

export const questionsSchema = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(20).max(5000),
  tags: z.array(z.string().min(3).max(15)).min(1).max(5),
});
