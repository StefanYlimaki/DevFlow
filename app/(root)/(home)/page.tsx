import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: 1,
    title: "How to Handle Your Program's Emotional Breakdowns",
    tags: [
      { _id: 101, name: "Programming" },
      { _id: 102, name: "Emotions" },
    ],
    author: {
      _id: 201,
      name: "Dr. Codey Feelgood",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 42,
    views: 987,
    answers: [],
    createdAt: new Date("2023-10-10T17:30:00"),
  },
  {
    _id: 2,
    title: "The Secret Life of Debugging Ducks",
    tags: [
      { _id: 103, name: "Debugging" },
      { _id: 104, name: "Duckology" },
    ],
    author: {
      _id: 202,
      name: "Quacky Debugger",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 58,
    views: 1234,
    answers: [],
    createdAt: new Date("2023-10-09T12:15:00"),
  },
  {
    _id: 3,
    title: "The Great API Bake-Off: Where Code Meets Cake",
    tags: [
      { _id: 105, name: "API" },
      { _id: 106, name: "Baking" },
    ],
    author: {
      _id: 203,
      name: "Baker Dev",
      picture: "/assets/icons/avatar.svg",
    },
    upvotes: 35,
    views: 2023,
    answers: [],
    createdAt: new Date("2023-10-08T09:45:00"),
  },
];

const Home = () => {
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
        {questions.length > 0 ? (
          questions.map((question) => (
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
    </>
  );
};

export default Home;
