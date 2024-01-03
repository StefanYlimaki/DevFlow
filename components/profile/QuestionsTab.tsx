import { getQuestionsByUser } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

interface QuestionsTabProps {
  searchParams: any;
  userId: string;
  clerkId: string;
}

const QuestionsTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionsTabProps) => {
  const result = await getQuestionsByUser({
    userId,
    page: searchParams.p,
  });

  if (!result) return null;

  return (
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
  );
};

export default QuestionsTab;
