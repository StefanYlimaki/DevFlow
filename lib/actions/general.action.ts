"use server";

import Answer from "@/database/answer.modal";
import { connectToDatabase } from "./mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/database/question.modal";
import User from "@/database/user.modal";
import Tag from "@/database/tag.modal";

const searchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;

    const searchQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();
    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // Everything
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: searchQuery })
          .limit(2);

        results.push(
          ...queryResults.map((r) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : r[searchField],
            type,
            id:
              type === "user"
                ? r.clerkId
                : type === "answer"
                  ? r.question
                  : r._id,
          }))
        );
      }
    } else {
      // Specific type
      const modalInfo = modelsAndTypes.find((m) => m.type === typeLower);
      if (!modalInfo) throw new Error("Invalid type");

      const queryResults = await modalInfo.model
        .find({ [modalInfo.searchField]: searchQuery })
        .limit(5);

      results = queryResults.map((r) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : r[modalInfo.searchField],
        type,
        id:
          type === "user" ? r.clerkId : type === "answer" ? r.question : r._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.error("Error while fetching global results", error);
  }
}
