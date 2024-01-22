import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-[40px] w-[200px] bg-slate-900/50 " />

        <Skeleton className="h-[46px] w-[100px]  bg-orange-400" />
      </div>

      <div className="mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center md:flex-col">
        <Skeleton className="h-[46px] w-full " />

        <div className="hidden max-md:flex">
          <Skeleton className="h-[56px] w-[170px]" />
        </div>
        <div className="mt-4 w-full flex-wrap gap-3 max-md:hidden md:flex">
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
          <Skeleton className="h-[40px] w-[100px]" />
        </div>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="card-wrapper h-[180px] w-full rounded-[10px] p-9 sm:px-11"
          >
            <div className="flex flex-col gap-2">
                <Skeleton className="h-[20px] w-full bg-slate-900/50 " />
                <Skeleton className="h-[20px] w-[50px] bg-slate-900/10 " />
                <Skeleton className="h-[20px] w-2/4 bg-slate-900/50 " />
                <Skeleton className="h-[20px] w-2/4 bg-slate-900/50 " />
            </div>
          </Skeleton>
        ))}
      </div>
    </>
  );
}
