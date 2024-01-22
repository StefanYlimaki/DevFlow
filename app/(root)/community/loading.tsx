import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[50px] w-[200px] bg-slate-900/50 " />

      <div className="mt-11 flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <Skeleton className="h-[60px] w-3/4" />
        <Skeleton className="h-[60px] w-1/4" />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-[285px] bg-slate-100 max-xs:min-w-full xs:w-[260px]"
          >
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
              <Skeleton className="h-[25px] w-[200px] bg-slate-900/50" />
              <Skeleton className="h-[15px] w-[100px] bg-slate-900/20" />
              <div className="flex gap-2">
                <Skeleton className="h-[25px] w-[60px] bg-slate-900/10" />
                <Skeleton className="h-[25px] w-[60px] bg-slate-900/10" />
                <Skeleton className="h-[25px] w-[60px] bg-slate-900/10" />
              </div>
            </div>
          </Skeleton>
        ))}
      </section>
    </>
  );
}
