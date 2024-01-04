"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "./mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
  GetTopTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.modal";
import Question from "@/database/question.modal";
import console from "console";
import { FilterQuery } from "mongoose";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 2 } = params;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
    }

    const skipBy = (page - 1) * pageSize;

    const tags = await Tag.find(query)
      .skip(skipBy)
      .limit(pageSize)
      .sort(sortOptions);

    const totalTags = await Tag.countDocuments(query);

    const hasNext = skipBy + tags.length < totalTags;

    return { tags, hasNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopTags(params: GetTopTagsParams) {
  try {
    const limit = params.limit || 5;

    connectToDatabase();

    const tags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: limit },
    ]);

    return { tags };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { userId, limit = 3 } = params;

    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("User not found");

    // Find interactions for the user and group by tag

    return [
      { _id: 1, name: "Tag1" },
      { _id: 2, name: "Tag2" },
      { _id: 3, name: "Tag3" },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, searchQuery, page = 1, pageSize = 10 } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery)
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];

    const skipBy = (page - 1) * pageSize;

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: query,
      options: { sort: { createdAt: -1 }, skip: skipBy, limit: pageSize },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    const totalTagsQuestions = await Tag.aggregate([
      { $match: { _id: tagId } },
      { $project: { numberOfQuestions: { $size: "$questions" } } },
    ]).exec();

    const TagsQuestionsArraySize =
      totalTagsQuestions.length > 0
        ? totalTagsQuestions[0].numberOfQuestions
        : 0;

    const hasNext = skipBy + tag.questions.length < TagsQuestionsArraySize;

    const questions = tag.questions;

    return { tagTitle: tag.name, questions, hasNext };
  } catch (error) {
    console.error(error);
  }
}
