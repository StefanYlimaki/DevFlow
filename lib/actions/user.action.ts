"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.modal";
import Tag from "@/database/tag.modal";

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

export async function getUserByUserId(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ _id: userId });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    const users = await User.find({}).sort({ createdAt: -1 });

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
  const { clerkId } = params;

  try {
    connectToDatabase();

    const user = await getUserByClerkId({ clerkId });
    if (!user) throw new Error("User not found");

    const questions = await Question.find({
      _id: { $in: user.saved },
    })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.error(error);
  }
};
