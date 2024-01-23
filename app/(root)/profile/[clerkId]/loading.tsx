import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Skeleton className="h-[140px] w-[140px] rounded-full dark:bg-slate-50/50" />

            <div className="mt-3">
              <Skeleton className="h-8 w-36 bg-slate-900/25 dark:bg-slate-50/50" />
              <Skeleton className="mt-2 h-4 w-28 bg-slate-900/20 dark:bg-slate-50/50" />

              <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
                <Skeleton className="h-6 w-6 dark:bg-slate-50/50" />
                <Skeleton className="h-6 w-32 dark:bg-slate-50/50" />
              </div>
            </div>
          </div>

          <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
            <Skeleton className="h-12 w-[175px] dark:bg-slate-50/50" />
          </div>
        </div>

        <div className="mt-10">
          <Skeleton className="h-6 w-24 bg-slate-900/25 dark:bg-slate-50/50" />

          <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
            <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
              <div>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="mt-2 h-6 w-16" />
              </div>

              <div>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="mt-2 h-6 w-16" />
              </div>
            </div>

            <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
              <Skeleton className="h-16 w-10 rounded-xl bg-yellow-300/50 dark:bg-yellow-300/25" />
              <div>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="mt-2 h-6 w-16" />
              </div>
            </div>

            <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
              <Skeleton className="h-16 w-10 rounded-xl bg-gray-400 dark:bg-gray-400/50" />
              <div>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="mt-2 h-6 w-16" />
              </div>
            </div>

            <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
              <Skeleton className="h-16 w-10 rounded-xl bg-orange-300 dark:bg-orange-300/25" />
              <div>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="mt-2 h-6 w-16" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-10">
          <Skeleton className="flex h-12 w-44 gap-2 p-2">
            <Skeleton className="h-full w-full bg-orange-400/50 dark:bg-orange-400/50" />
            <Skeleton className="h-full w-full bg-slate-900/25 dark:bg-slate-600/50" />
          </Skeleton>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              className="card-wrapper h-[180px] w-full rounded-[10px] p-9 sm:px-11"
            >
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[20px] w-full bg-slate-900/50 " />

                <div className="flex gap-2">
                  <Skeleton className="h-[30px] w-[60px] bg-slate-900/10 " />
                  <Skeleton className="h-[30px] w-[60px] bg-slate-900/10 " />
                  <Skeleton className="h-[30px] w-[60px] bg-slate-900/10 " />
                </div>

                <Skeleton className="h-[20px] w-1/4 bg-slate-900/50 " />
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </>
  );
}
