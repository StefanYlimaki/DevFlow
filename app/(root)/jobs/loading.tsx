import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="p-2">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-[40px] w-[200px] bg-slate-900/50 " />
      </div>

      <div className="mt-11 flex w-full gap-5 sm:items-center">
        <Skeleton className="h-[50px] w-full " />
        <Skeleton className="h-[50px] w-[170px]" />
      </div>

      <div className="mt-4 w-full flex-wrap gap-3 max-md:hidden md:flex">
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
        </div>

      <div className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            key={item}
            className="background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-start gap-6 rounded-lg border p-6 sm:flex-row sm:p-8"
          >
            <Skeleton className="size-[64px] min-w-[64px] rounded-full" />

            <div className="w-full">
              <div className="md:flex-between flex-col justify-start md:flex-row">
                <Skeleton className="h-[40px] w-[50%] bg-slate-900/25 " />
                <Skeleton className="h-[40px] w-[200px] rounded-xl bg-slate-900/10" />
              </div>

              <Skeleton className="mt-4 h-[40px] w-full bg-slate-900/50" />

              <div className="flex-between mt-8 flex-wrap gap-6">
                <div className="flex flex-wrap items-center gap-6">
                  <Skeleton className="h-[35px] w-[100px]" />
                  <Skeleton className="h-[35px] w-[100px]" />
                </div>

                <Skeleton className="h-[35px] w-[100px] bg-orange-400/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
