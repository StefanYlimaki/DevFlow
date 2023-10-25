import Metric from "@/components/shared/Metric";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ParseHTML from "@/components/shared/ParseHTML";
import Answer from "@/components/forms/Answer";

const Question = async ({ params }: { params: { questionId: string } }) => {
  const { questionId } = params;
  const question = await getQuestionById({ questionId });

  console.log(question);

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            className="flex items-center justify-start gap-1"
            href={`/profile/${question.author.clerkId}`}
          >
            <Image
              src={question.author.picture}
              alt="author profile picture"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>

          <div className="flex justify-end">TODO: Voting</div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(question.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message icon"
          value={formatNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <Answer />

      {/* <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 max-md:pb-14 sm:px-14">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex-start w-full flex-col">
            <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Metric
                imgUrl={question.author.picture}
                alt="user"
                value={question.author.name}
                href={`/profile/${question.author.clerkId}`}
                title=""
                isAuthor
                textStyles="paragraph-semibold text-dark300_light700"
              />

              <div className="flex justify-end gap-5">
                <div className="flex gap-2.5">
                  <div className="flex">
                    <Image
                      src="/assets/icons/upvote.svg"
                      alt="upvote"
                      width={18}
                      height={18}
                    />
                    <div className="flex-center background-light700_dark400 ml-1 min-w-[18px] rounded-sm p-1">
                      <p className="subtle-medium text-dark400_light900">
                        {formatNumber(question.upvotes.length)}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <Image
                      src="/assets/icons/downvote.svg"
                      alt="downvote"
                      width={18}
                      height={18}
                    />
                    <div className="flex-center background-light700_dark400 ml-1 min-w-[18px] rounded-sm p-1">
                      <p className="subtle-medium text-dark400_light900">
                        {formatNumber(question.downvotes.length)}
                      </p>
                    </div>
                  </div>
                </div>
                <Image
                  src="/assets/icons/star-red.svg"
                  alt="save"
                  width={18}
                  height={18}
                />
              </div>
            </div>

            <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
              {question.title}
            </h2>
          </div>

          <div className="mb-8 mt-5 flex flex-wrap gap-4">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt={"clock"}
              value={""}
              title={` asked ${getTimeStamp(question.createdAt)}`}
              textStyles="small-medium text-dark400_light700 flex items-center gap-1"
            />
            <Metric
              imgUrl="/assets/icons/message.svg"
              alt={"message"}
              value={question.answers.length}
              title={" Answers"}
              textStyles="small-medium text-dark400_light700 flex items-center gap-1"
            />
            <Metric
              imgUrl="/assets/icons/eye.svg"
              alt={"eye"}
              value={question.views}
              title={" Views"}
              textStyles="small-medium text-dark400_light700 flex items-center gap-1"
            />
          </div>

          <div className="markdown w-full min-w-full">{question.content}</div>

          <div className="mt-8 flex flex-wrap gap-2">
            {question.tags.map((tag: any) => (
              <RenderTag _id={tag._id} name={tag.name} key={tag._id} />
            ))}
          </div>

          <div className="mt-11">
            <div className="flex items-center justify-between">
              <h3 className="primary-text-gradient">
                {question.answers.length} Answers
              </h3>

              <Filter filters={AnswerFilters} />
            </div>

            {question.answers.lenght > 0 && (
              <article className="light-border border-b py-10"></article>
            )}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Question;
