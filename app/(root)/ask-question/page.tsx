import Question from "@/components/forms/Question";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const AskQuestion = async () => {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId({ userId });

  if (!mongoUser) return null;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
