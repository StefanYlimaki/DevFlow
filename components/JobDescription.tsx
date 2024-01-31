"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const JobDescription = ({ jobDescription }: { jobDescription: string }) => {
  const [isClampedDown, setIsClampedDown] = useState(true);

  return (
    <>
      <pre
      style={{ fontFamily: "inherit" }}
        className={`body-regular text-dark500_light700 mt-2  max-w-full overflow-hidden whitespace-pre-wrap  ${isClampedDown ? "line-clamp-2" : ""}`}
      >
        {jobDescription}
      </pre>

      <Button
        onClick={() => setIsClampedDown(!isClampedDown)}
        className="paragraph-medium btn-secondary text-dark300_light900 mt-2 min-h-[30px] min-w-[150px] px-4 py-3"
      >
        {isClampedDown ? "Show more" : "Show less"}
      </Button>
    </>
  );
};

export default JobDescription;
