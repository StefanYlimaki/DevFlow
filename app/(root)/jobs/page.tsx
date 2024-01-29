import LocalSearch from "@/components/shared/search/LocalSearch";
import { auth } from "@clerk/nextjs";
import React from "react";
import type { Metadata } from "next";
import LocationFilter from "@/components/LocationFilter";
import { getJobs } from "@/lib/actions/jobs.action";

export const metadata: Metadata = {
  title: "Collections",
};

const Home = async ({
  searchParams,
}: {
  searchParams: { location: string; p: string };
}) => {
  const { userId: clerkId } = auth();

  if (!clerkId) return null;

  const result = await getJobs({
    page: searchParams.p ? +searchParams.p : 1,
    country: searchParams.location,
  });

  if (!result) return null;

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      </div>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <LocationFilter otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      {/* <div className="mt-10 flex w-full flex-col gap-6">
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
              title="No Saved Questions Found"
              description="It appears that there are no saved questions in your collection at the moment 😔.Start exploring and saving questions that pique your interest 🌟"
              link="/"
              linkTitle="Explore Questions"
            />
          </div>
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.p ? +searchParams.p : 1}
          hasNext={result.hasNext}
        />
      </div> */}
    </>
  );
};

export default Home;
