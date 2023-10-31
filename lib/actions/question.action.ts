"use server";

import Question from "@/database/question.modal";
import Tag from "@/database/tag.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.modal";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  const { questionId } = params;
  try {
    connectToDatabase();

    const question = await Question.findOne({ _id: questionId })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    if (!question) throw new Error("Question not found");

    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: { question: question._id },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action

    // Increment author's reputation by 5 for asking a question
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function voteQuestion(params: QuestionVoteParams) {
  try {
    connectToDatabase();

    const { questionId, userId, hasUpvoted, hasDownvoted, path, actionType } =
      params;

    switch (actionType) {
      case "upvote":
        if (hasUpvoted) {
          await Question.findByIdAndUpdate(questionId, {
            $pull: { upvotes: userId },
          });
        } else {
          await Question.findByIdAndUpdate(questionId, {
            $push: { upvotes: userId },
          });
        }
        break;
      case "downvote":
        if (hasDownvoted) {
          await Question.findByIdAndUpdate(questionId, {
            $pull: { downvotes: userId },
          });
        } else {
          await Question.findByIdAndUpdate(questionId, {
            $push: { downvotes: userId },
          });
        }
        break;
      default:
        throw new Error("Invalid action type");
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
