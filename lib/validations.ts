import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  content: z.string().min(20).max(5000),
  tags: z.array(z.string().min(3).max(15)).min(1).max(5),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfileSchema = z.object({
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  portfolio: z.string().url(),
  location: z.string().min(3).max(30),
  bio: z.string().min(10).max(500),
});
