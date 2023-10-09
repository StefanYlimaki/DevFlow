import Link from "next/link";
import Image from "next/image";
import React from "react";
import RenderTag from "./RenderTag";

const topQuestions = [
  {
    _id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  {
    _id: 2,
    title: "How can an airconditioning machine exist?",
  },
  {
    _id: 3,
    title: "Interrogated every time crossing UK Border as citizen",
  },
  {
    _id: 4,
    title: "Low digit addition generator",
  },
  {
    _id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "Javascript",
    totalQuestion: 1000,
  },
  {
    _id: 2,
    name: "HTML",
    totalQuestion: 752,
  },
  {
    _id: 3,
    name: "Typescript",
    totalQuestion: 512,
  },
  {
    _id: 4,
    name: "React",
    totalQuestion: 45,
  },
  {
    _id: 5,
    name: "Next.js",
    totalQuestion: 12,
  },
];

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="flex-1">
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer  items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-dark300_light900 mt-16 flex-1">
        <h3 className="h3-bold text-dark200_light900">Popular tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestion}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
