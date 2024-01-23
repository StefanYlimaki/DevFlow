import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-[50px] w-[200px] bg-slate-900/50 " />

      <div className="mt-11 flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full sm:w-[170px] " />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            key={item}
            className="h-[285px] bg-slate-100 max-xs:min-w-full xs:w-[260px]"
          >
            <div className="flex flex-col justify-center gap-4 p-8">
              <Skeleton className="h-[35px] w-[100px] bg-slate-900/10" />
              <Skeleton className="h-[125px] w-full bg-slate-900/25" />
              <div className="flex gap-2">
                <Skeleton className="h-[20px] w-[20px] bg-orange-300" />
                <Skeleton className="h-[20px] w-[60px] bg-slate-900/25" />
              </div>
            </div>
          </Skeleton>
        ))}
      </section>
    </>
  );
}
