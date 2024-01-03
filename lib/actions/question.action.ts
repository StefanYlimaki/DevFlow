"use server";

import Question from "@/database/question.modal";
import Tag from "@/database/tag.modal";
import { connectToDatabase } from "./mongoose";
import {
  CreateQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetTopQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.modal";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery)
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];

    if (filter === "unanswered") query.answers = { $size: 0 };

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1, upvotes: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const skipBy = (page - 1) * pageSize;

    const questions = await Question.find(query)
      .skip(skipBy)
      .limit(pageSize)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments(query);
    const hasNext = skipBy + questions.length < totalQuestions;

    return { questions, hasNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopQuestions(params: GetTopQuestionsParams) {
  try {
    const limit = params.limit || 5;

    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ views: -1, upvotes: -1 })
      .limit(limit);

    return { questions };
  } catch (error) {
    console.error(error);
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
          $push: { questions: question._id },
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

export async function updateQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, questionId, path } = params;

    const questionToEdit = await getQuestionById({ questionId });

    if (!questionToEdit) throw new Error("Question not found");

    questionToEdit.title = title;
    questionToEdit.content = content;

    await questionToEdit.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

    connectToDatabase();

    const user = await User.findById(JSON.parse(userId));

    const question = await Question.findById(JSON.parse(questionId));

    if (hasDownvoted) {
      question.downvotes.pull(user._id);
    } else if (hasUpvoted) {
      question.upvotes.pull(user._id);
      question.downvotes.push(user._id);
    } else {
      question.downvotes.push(user._id);
    }

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

    connectToDatabase();

    const user = await User.findById(JSON.parse(userId));

    const question = await Question.findById(JSON.parse(questionId));

    if (hasUpvoted) {
      question.upvotes.pull(user._id);
    } else if (hasDownvoted) {
      question.downvotes.pull(user._id);
      question.upvotes.push(user._id);
    } else {
      question.upvotes.push(user._id);
    }

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
