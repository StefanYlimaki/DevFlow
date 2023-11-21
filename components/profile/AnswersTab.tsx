import { getAnswersByUser } from "@/lib/actions/user.action";
import React from "react";
import AnswerCard from "../cards/AnswerCard";

interface QuestionsTabProps {
  searchParams: any;
  userId: string;
  clerkId: string;
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionsTabProps) => {
  const result = await getAnswersByUser({
    userId,
    page: searchParams.p,
  });

  if (!result) return null;

  return (
    <div>
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
  );
};

export default AnswersTab;
