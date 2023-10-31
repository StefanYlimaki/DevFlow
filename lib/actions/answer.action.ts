"use server";

import Answer from "@/database/answer.modal";
import { connectToDatabase } from "./mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.modal";
import User from "@/database/user.modal";

/* GET */
export async function getAnswersByQuestionId(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
      })
      .sort({
        createdAt: -1,
      });

    return { answers };
  } catch (error) {
    console.error(error);
  }
}

/* POST */
export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
