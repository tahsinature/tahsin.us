import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4 container">
      <div className="space-y-2 w-full py-5">
        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-5 w-[90%]`} />
        <Skeleton className={`h-6 w-[30%]`} />
        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-6 w-[0%]`} />

        <Skeleton className={`h-52 w-[80%] m-auto`} />
        <Skeleton className={`h-2 w-[50%] m-auto`} />

        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[90%]`} />
        <Skeleton className={`h-6 w-[0%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[80%]`} />
        <Skeleton className={`h-5 w-[86%]`} />
        <Skeleton className={`h-5 w-[70%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
      </div>
    </div>
  );
}
