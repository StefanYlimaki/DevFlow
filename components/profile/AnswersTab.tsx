import { getAnswersByUser } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "../shared/Pagination";

interface QuestionsTabProps {
  searchParams: any;
  userId: string;
  clerkId: string;
  pageNumber: number;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
  pageNumber,
}: QuestionsTabProps) => {
  const result = await getAnswersByUser({
    userId,
    page: searchParams.p,
  });

  if (!result) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {result.userAnswers.map((answer) => (
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            clerkId={clerkId}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
          />
        ))}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={pageNumber || 1} hasNext={result.hasNext} />
      </div>
    </>
  );
};

export default AnswersTab;
