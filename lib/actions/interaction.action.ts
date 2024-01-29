"use server";

import Question from "@/database/question.modal";
import { connectToDatabase } from "./mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.modal";
import { revalidatePath } from "next/cache";

export async function ViewQuestion(params: ViewQuestionParams) {
  const { questionId, userId } = params;

  try {
    connectToDatabase();

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return;
      }

      const question = await Question.findById(questionId);

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
        tags: question.tags,
      });

      // Update ViewCount of the question
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

      revalidatePath(`/question/${questionId}`);
    }
  } catch (error) {
    console.error(error);
  }
}
