"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const active = searchParams.get("f") || "";

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get("f") === value) {
      params.delete("f");
    } else {
      params.set("f", value);
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="mt-4 w-full flex-wrap gap-3 max-md:hidden md:flex ">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => {
            setFilter(filter.value);
          }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 dark:bg-dark-300"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
