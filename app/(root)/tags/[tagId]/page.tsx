import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import React from "react";
import type { Metadata } from "next";

type Props = {
  params: { tagId: string };
  searchParams: { f: string; p: string, q: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getQuestionsByTagId({
    tagId: params.tagId,
    page:  1,
    pageSize: 0,
  });

  return {
    title: result?.tagTitle,
  };
}

const Tag = async ({ params, searchParams }: Props) => {
  const result = await getQuestionsByTagId({
    tagId: params.tagId,
    page: searchParams.p ? +searchParams.p : 1,
    pageSize: 10,
    searchQuery: searchParams.q,
  });

  if (!result) return null;

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      </div>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <div>
            <NoResult
              title="There are no questions to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.p ? +searchParams.p : 1}
          hasNext={result.hasNext}
        />
      </div>
    </>
  );
};

export default Tag;
