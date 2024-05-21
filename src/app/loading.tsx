import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center space-x-4 container">
      <div className="space-y-2 w-full py-5">
        <Skeleton className={`h-5 w-[90%]`} />
        <Skeleton className={`h-9 w-[40%]`} />
        <Skeleton className={`h-4 w-[50%]`} />
        <Skeleton className={`h-6 w-[30%]`} />
        <Skeleton className={`h-5 w-[70%]`} />
        <Skeleton className={`h-52 w-[100%]`} />
        <Skeleton className={`ml-auto mt-5 h-10 w-[30%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[90%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
        <Skeleton className={`h-5 w-[100%]`} />
      </div>
    </div>
  );
}
