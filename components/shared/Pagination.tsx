"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface Props {
  pageNumber: number;
  hasNext: boolean;
}

const Pagination = ({ pageNumber, hasNext }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: "prev" | "next") => {
    const newPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const params = new URLSearchParams(searchParams);
    if (newPageNumber === 1) {
      params.delete("p");
    } else {
      params.set("p", newPageNumber.toString());
    }

    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>

      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>

      <Button
        disabled={!hasNext}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const setPage = (value: string) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (value === "1") {
  //     params.delete("p");
  //   } else {
  //     params.set("p", value);
  //   }
  //   router.push(pathname + "?" + params.toString());
  // };
  // const currentPage = searchParams.get("p") || "1";
  // return (
  //   <div className="flex w-full items-center justify-center gap-2">
  //     <Button
  //       onClick={() => setPage((parseInt(currentPage) - 1).toString())}
  //       className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3"
  //       disabled={currentPage === "1"}
  //     >
  //       Prev
  //     </Button>
  //     <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
  //       <p className="body-semibold text-light-900">{currentPage}</p>
  //     </div>
  //     <Button
  //       onClick={() => setPage((parseInt(currentPage) + 1).toString())}
  //       className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3"
  //     >
  //       Next
  //     </Button>
  //   </div>
  // );
};

export default Pagination;
