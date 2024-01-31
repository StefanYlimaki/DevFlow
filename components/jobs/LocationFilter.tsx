"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CountryList } from "@/constants/filters";

interface Props {
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ otherClasses, containerClasses }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get("location") === value) {
      params.delete("location");
    } else {
      params.set("location", value);
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select Location" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular max-h-[50dvh] overflow-y-auto border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {CountryList.map((filter) => (
              <SelectItem className="focus:bg-light-800 dark:focus:bg-dark-400" key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
