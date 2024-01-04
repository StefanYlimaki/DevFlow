import { getQuestionsByUser } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "../shared/Pagination";

interface QuestionsTabProps {
  searchParams: any;
  userId: string;
  clerkId: string;
  pageNumber: number;
}

const QuestionsTab = async ({
  searchParams,
  userId,
  clerkId,
  pageNumber,
}: QuestionsTabProps) => {
  const result = await getQuestionsByUser({
    userId,
    page: pageNumber || 1,
    pageSize: 5,
  });

  if (!result) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {result.userQuestions.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))}
      </div>
      <div className="mt-10">
        <Pagination pageNumber={pageNumber || 1} hasNext={result.hasNext} />
      </div>
    </>
  );
};

export default QuestionsTab;
