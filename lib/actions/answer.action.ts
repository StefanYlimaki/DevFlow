"use server";

import Answer from "@/database/answer.modal";
import { connectToDatabase } from "./mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.modal";
import User from "@/database/user.modal";

/* GET */
export async function getAnswersByQuestionId(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    let sortOptions = {};

    switch (sortBy) {
      case "most_upvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "least_upvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
    }

    const skipBy = (page - 1) * pageSize;

    const answers = await Answer.find({ question: questionId })
      .skip(skipBy)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortOptions);

    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const hasNext = skipBy + pageSize < totalAnswers;

    return { answers, hasNext };
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

export async function upvoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

  try {
    connectToDatabase();

    const user = await User.findById(JSON.parse(userId));
    const answer = await Answer.findById(JSON.parse(answerId));

    if (hasUpvoted) {
      answer.upvotes.pull(user._id);
    } else if (hasDownvoted) {
      answer.downvotes.pull(user._id);
      answer.upvotes.push(user._id);
    } else {
      answer.upvotes.push(user._id);
    }

    await answer.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

  try {
    connectToDatabase();

    const user = await User.findById(JSON.parse(userId));
    const answer = await Answer.findById(JSON.parse(answerId));

    if (hasDownvoted) {
      answer.downvotes.pull(user._id);
    } else if (hasUpvoted) {
      answer.upvotes.pull(user._id);
      answer.downvotes.push(user._id);
    } else {
      answer.downvotes.push(user._id);
    }

    await answer.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
