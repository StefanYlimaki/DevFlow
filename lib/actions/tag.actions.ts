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

    const searchFilters = params.searchQuery
      ? { name: { $regex: params.searchQuery, $options: "i" } }
      : {};

    const tags = await Tag.find({ ...searchFilters }).sort({ createdAt: -1 });

    return { tags };
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

    // eslint-disable-next-line no-unused-vars
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.error(error);
  }
}
