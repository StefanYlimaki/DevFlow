import { getAnswersByUser } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../cards/QuestionCard";

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

  console.log(result);

  if (!result) return null;

  return (
    <div>
      {result.userAnswers.map((answer) => (
        <QuestionCard
          key={answer.question._id}
          _id={answer.question._id}
          clerkId={clerkId}
          title={answer.question.title}
          tags={answer.question.tags}
          author={answer.question.author}
          upvotes={answer.question.upvotes}
          views={answer.question.views}
          answers={answer.question.answers}
          createdAt={answer.question.createdAt}
        />
      ))}
    </div>
  );
};

export default AnswersTab;
