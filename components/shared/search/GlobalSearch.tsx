"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import GlobalSearchResults from "./GlobalSearchResults";

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

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const pathname = usePathname();
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!pathname || !router || !searchParams) return;

    const params = new URLSearchParams(searchParams);

    if (debouncedSearchTerm === "") {
      params.delete("gq");
    } else {
      params.set("gq", debouncedSearchTerm);
    }

    router.push(pathname + "?" + params.toString());
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        ref={parentRef}
        className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={23}
          height={23}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search anything globally"
          onChange={(e) => {
            handleChange(e);
            setIsOpen(Boolean(e.target.value));
          }}
          value={searchTerm}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none"
        />
      </div>

      {isOpen && (
        <GlobalSearchResults
          parentRef={parentRef}
          onClickOutside={() => {
            setIsOpen(false);
            const params = new URLSearchParams(searchParams);
            params.delete("gq");
            params.delete("type");
            setSearchTerm("");
            router.push(pathname + "?" + params.toString());
          }}
        />
      )}
    </div>
  );
};

export default GlobalSearch;
