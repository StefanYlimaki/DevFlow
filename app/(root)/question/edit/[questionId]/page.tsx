import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditQuestion = async ({ params }: { params: { questionId: string } }) => {
  const { userId } = auth();
  const mongoUser = await getUserByClerkId({ userId });
  if (!mongoUser) return null;

  const questionToEdit = await getQuestionById({
    questionId: params.questionId,
  });

  if (!questionToEdit) return null;

  const { title, content, tags } = questionToEdit;

  const tagNames = tags.map((tag: any) => {
    return tag.name;
  });

  const questionData = {
    questionId: params.questionId,
    title,
    content,
    tags: JSON.stringify(tagNames),
  };

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionData={questionData}
          type="edit"
        />
      </div>
    </>
  );
};

export default EditQuestion;
