import Question from "@/components/forms/Question";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const AskQuestion = async () => {
  const { userId: clerkId } = auth();
  const mongoUser = await getUserByClerkId({ clerkId });

  if (!mongoUser) return null;

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} type="create" />
      </div>
    </div>
  );
};

export default AskQuestion;
