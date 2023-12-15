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

    const searchFilters = params.searchQuery
      ? { name: { $regex: params.searchQuery, $options: "i" } }
      : {};

    const users = await User.find({ ...searchFilters }).sort({ createdAt: -1 });

    return { users };
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

    const { clerkId } = params;

    const searchFilters = params.searchQuery
      ? { title: { $regex: params.searchQuery, $options: "i" } }
      : {};

    const user = await getUserByClerkId({ clerkId });
    if (!user) throw new Error("User not found");

    const questions = await Question.find({
      _id: { $in: user.saved },
      ...searchFilters,
    })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
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

    return { user, totalQuestions, totalAnswers };
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

    const userQuestions = await Question.find({ author: user._id })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ views: -1, upvotes: -1 })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return { totalQuestions, userQuestions };
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

    const userAnswers = await Answer.find({ author: _id })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { totalAnswers, userAnswers };
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
