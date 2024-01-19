"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateUserParams,
  DeleteAnswerParams,
  DeleteQuestionParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.modal";
import Tag from "@/database/tag.modal";
import Answer from "@/database/answer.modal";
import console from "console";
import { FilterQuery } from "mongoose";
import { BadgeCounts, BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserByClerkId(params: any) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 1 } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
      default:
        sortOptions = {};
    }

    const skipBy = (page - 1) * pageSize;

    const users = await User.find(query)
      .skip(skipBy)
      .limit(pageSize)
      .sort(sortOptions);

    const totalUsers = await User.countDocuments(query);

    const hasNext = skipBy + users.length < totalUsers;

    return { users, hasNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(userData: UpdateUserParams) {
  const { clerkId, updateData, path } = userData;

  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId });

    await User.findByIdAndUpdate(user._id, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(userData: DeleteUserParams) {
  const { clerkId } = userData;

  try {
    connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // eslint-disable-next-line no-unused-vars
    const userQuestionIds = await Question.find({ user: clerkId }).distinct(
      "_id"
    );

    // delete all questions of the user
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  const { questionId, userId, path } = params;

  try {
    connectToDatabase();

    const user = await User.findById(JSON.parse(userId));
    if (!user) throw new Error("User not found");

    const question = await Question.findById(JSON.parse(questionId));

    if (user.saved.includes(question._id)) {
      user.saved.pull(question._id);
    } else {
      user.saved.push(question._id);
    }

    await user.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectToDatabase();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
    }

    const skipBy = (page - 1) * pageSize;

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: { sort: sortOptions, skip: skipBy, limit: pageSize },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    const totalSavedQuestions = await User.aggregate([
      {
        $match: { clerkId },
      },
      {
        $project: {
          savedSize: { $size: "$saved" },
        },
      },
    ]).exec();

    const savedArraySize =
      totalSavedQuestions.length > 0 ? totalSavedQuestions[0].savedSize : 0;

    const hasNext = skipBy + user.saved.length < savedArraySize;

    if (!user) throw new Error("User not found");

    return { questions: user.saved, hasNext };
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    const [totalQuestionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);
    const [totalQuestionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    const [totalAnswerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    
    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      { type: "QUESTION_UPVOTES" as BadgeCriteriaType, count: totalQuestionUpvotes?.totalUpvotes || 0 },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswerUpvotes?.totalUpvotes || 0 },
      { type: "TOTAL_VIEWS" as BadgeCriteriaType, count: totalQuestionViews?.totalViews || 0 },
    ]

    const badgeCounts: BadgeCounts = assignBadges({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCounts,
      reputation: user.reputation,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getQuestionsByUser = async (params: GetUserStatsParams) => {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 5 } = params;

    const _id = JSON.parse(userId);

    const user = await User.findById({ _id });
    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });

    const skipBy = (page - 1) * pageSize;

    const userQuestions = await Question.find({ author: user._id })
      .skip(skipBy)
      .limit(pageSize)
      .sort({ views: -1, upvotes: -1 })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    const hasNext = skipBy + userQuestions.length < totalQuestions;

    return { totalQuestions, userQuestions, hasNext };
  } catch (error) {
    console.error(error);
  }
};

export const getAnswersByUser = async (params: GetUserStatsParams) => {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 5 } = params;

    const _id = JSON.parse(userId);

    const totalAnswers = await Answer.countDocuments({ author: _id });

    const skipBy = (page - 1) * pageSize;

    const userAnswers = await Answer.find({ author: _id })
      .skip(skipBy)
      .limit(pageSize)
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const hasNext = skipBy + userAnswers.length < totalAnswers;

    return { totalAnswers, userAnswers, hasNext };
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    connectToDatabase();

    const { id, path } = params;

    const answer = Answer.findByIdAndDelete(id);

    if (!answer) return { status: "failed", message: "Answer not found" };

    revalidatePath(path);

    return { status: "success", message: "Answer deleted successfully" };
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuestion = async (params: DeleteQuestionParams) => {
  try {
    connectToDatabase();

    const { id, path } = params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) return { status: "failed", message: "Question not found" };

    revalidatePath(path);

    return { status: "success", message: "Question deleted successfully" };
  } catch (error) {
    console.error(error);
  }
};
