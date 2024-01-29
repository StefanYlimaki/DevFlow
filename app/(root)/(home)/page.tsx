import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";
import React from "react";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Home",
};

const Home = async ({
  searchParams,
}: {
  searchParams: { q: string; f: string; p: string };
}) => {
  const { userId: clerkId } = auth();
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.f,
    page: searchParams.p ? +searchParams.p : 1,
    pageSize: 10,
    clerkId: clerkId || "",
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />

        <HomeFilters />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
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
          <>
            {result.errorType === 1 ? (
              <NoResult
                title="You need to be logged in to see the recommended questions"
                description="Log in to see the recommended questions. 🚀"
                link="/login"
                linkTitle="Log in"
              />
            ) : (
              <NoResult
                title="There are no questions to show"
                description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
                link="/ask-question"
                linkTitle="Ask a Question"
              />
            )}
          </>
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          hasNext={result.hasNext}
        />
      </div>
    </>
  );
};

export default Home;
