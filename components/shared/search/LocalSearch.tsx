"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Add useNavigation

interface Props {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const LocalSearch = ({
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname || !router || !searchParams) return;

    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm === "") {
      params.delete("q");
    } else {
      params.set("q", debouncedSearchTerm);
    }

    router.push(pathname + "?" + params.toString());
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  const handleChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 md:w-full ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="SearchIcon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="paragraph-regular no-focus placeholder border-none bg-transparent text-dark-100 shadow-none outline-none dark:text-light-900 "
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="SearchIcon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
