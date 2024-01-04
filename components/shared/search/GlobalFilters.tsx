"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React from "react";

type filter = "question" | "answer" | "user" | "tag";

const GlobalFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const type = searchParams.get("type") || "";

  // eslint-disable-next-line no-unused-vars
  const setSearchType = (value: "question" | "answer" | "user" | "tag") => {
    const params = new URLSearchParams(searchParams);

    if (params.get("type") === value) {
      params.delete("type");
    } else {
      params.set("type", value);
    }

    router.push(pathname + "?" + params.toString());
  };

  const filters: filter[] = ["question", "answer", "user", "tag"];

  return (
    <div className="flex gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSearchType(filter)}
          className={`${
            type === filter
              ? "bg-primary-500 text-light-900"
              : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
          } light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default GlobalFilters;
