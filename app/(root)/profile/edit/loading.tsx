import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[45px] w-[150px] bg-slate-900/50 dark:bg-slate-50/50" />

      <div className="mt-9 flex w-full flex-col gap-10">
        <div>
          <Skeleton className="h-[20px] w-12 dark:bg-slate-50/25" />
          <Skeleton className="mt-2 flex h-[60px] w-full items-center p-3">
            <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          </Skeleton>
        </div>

        <div>
          <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          <Skeleton className="mt-2 flex h-[60px] w-full items-center p-3">
            <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          </Skeleton>
        </div>

        <div>
          <Skeleton className="h-[20px] w-24 dark:bg-slate-50/25" />
          <Skeleton className="mt-2 flex h-[60px] w-full items-center p-3">
            <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          </Skeleton>
        </div>

        <div>
          <Skeleton className="h-[20px] w-16 dark:bg-slate-50/25" />
          <Skeleton className="mt-2 flex h-[60px] w-full items-center p-3">
            <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          </Skeleton>
        </div>

        <div>
          <Skeleton className="h-[20px] w-10 dark:bg-slate-50/25" />
          <Skeleton className="mt-2 flex h-[120px] w-full items-center p-3">
            <Skeleton className="h-[20px] w-20 dark:bg-slate-50/25" />
          </Skeleton>
        </div>
        <div className=" flex justify-end">
          <Skeleton className="h-[35px] w-[80px] bg-orange-400 dark:bg-orange-400/50" />
        </div>
      </div>
    </>
  );
}
