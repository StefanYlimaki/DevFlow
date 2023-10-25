"use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "./mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.modal";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const tags = await Tag.find({}).sort({ createdAt: -1 });

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