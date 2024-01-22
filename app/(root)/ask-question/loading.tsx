import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[50px] w-[200px] bg-slate-900/50 " />

      <div className="mt-9 flex w-full flex-col gap-10">
        <div>
          <Skeleton className="h-[20px] w-1/4" />
          <Skeleton className="mt-2 h-[60px] w-full" />
          <Skeleton className="mt-2 h-[10px] w-2/4 rounded-sm bg-cyan-800/30" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-1/4" />
          <Skeleton className="mt-2 h-[300px] w-full" />
          <Skeleton className="mt-2 h-[10px] w-2/4 rounded-sm bg-cyan-800/30" />
        </div>

        <div>
          <Skeleton className="h-[20px] w-1/4" />
          <Skeleton className="mt-2 h-[60px] w-full" />
          <Skeleton className="mt-2 h-[10px] w-2/4 rounded-sm bg-cyan-800/30" />
        </div>

        <Skeleton className="h-[35px] w-[130px] bg-orange-400" />
      </div>
    </>
  );
}
