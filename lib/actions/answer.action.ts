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
import {
  POINTS_FOR_CREATING_ANSWER,
  POINTS_FOR_DOWNVOTING_ANSWER,
  POINTS_FOR_RECEIVING_DOWNVOTE_ON_ANSWER,
  POINTS_FOR_RECEIVING_UPVOTE_ON_ANSWER,
  POINTS_FOR_UPVOTING_ANSWER,
} from "@/constants/points";

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

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: POINTS_FOR_CREATING_ANSWER },
    });

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

    let userReputationChange = 0;
    let authorReputationChange = 0;

    if (hasUpvoted) {
      answer.upvotes.pull(user._id);
      userReputationChange = -POINTS_FOR_UPVOTING_ANSWER;
      authorReputationChange = -POINTS_FOR_RECEIVING_UPVOTE_ON_ANSWER;
    } else if (hasDownvoted) {
      answer.downvotes.pull(user._id);
      answer.upvotes.push(user._id);
      userReputationChange =
        -POINTS_FOR_DOWNVOTING_ANSWER + POINTS_FOR_UPVOTING_ANSWER;
      authorReputationChange =
        -POINTS_FOR_RECEIVING_DOWNVOTE_ON_ANSWER +
        POINTS_FOR_RECEIVING_UPVOTE_ON_ANSWER;
    } else {
      answer.upvotes.push(user._id);
      userReputationChange = POINTS_FOR_UPVOTING_ANSWER;
      authorReputationChange = POINTS_FOR_RECEIVING_UPVOTE_ON_ANSWER;
    }

    await User.findByIdAndUpdate(user._id, {
      $inc: { reputation: userReputationChange },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: authorReputationChange },
    });

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

    let userReputationChange = 0;
    let authorReputationChange = 0;

    if (hasDownvoted) {
      answer.downvotes.pull(user._id);
      userReputationChange = -POINTS_FOR_DOWNVOTING_ANSWER;
      authorReputationChange = -POINTS_FOR_RECEIVING_DOWNVOTE_ON_ANSWER;
    } else if (hasUpvoted) {
      answer.upvotes.pull(user._id);
      answer.downvotes.push(user._id);
      userReputationChange =
        -POINTS_FOR_UPVOTING_ANSWER + POINTS_FOR_DOWNVOTING_ANSWER;
      authorReputationChange =
        -POINTS_FOR_RECEIVING_UPVOTE_ON_ANSWER +
        POINTS_FOR_RECEIVING_DOWNVOTE_ON_ANSWER;
    } else {
      answer.downvotes.push(user._id);
      userReputationChange = POINTS_FOR_DOWNVOTING_ANSWER;
      authorReputationChange = POINTS_FOR_RECEIVING_DOWNVOTE_ON_ANSWER;
    }

    await User.findByIdAndUpdate(user._id, {
      $inc: { reputation: userReputationChange },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: authorReputationChange },
    });

    await answer.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
