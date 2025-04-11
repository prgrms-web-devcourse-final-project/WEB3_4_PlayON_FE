import { Skeleton } from '@/components/ui/skeleton';

export default function GuildInfoSectionSkeleton() {
  return (
    <div className="flex gap-6 w-[67%] self-center">
      <div className="flex flex-col gap-4 min-w-[628px] aspect-[16/7]">
        <Skeleton className="size-full rounded-3xl" />
        <Skeleton className="w-28 h-9 rounded-sm" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="w-60 h-12 rounded-md" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="w-12 h-7 rounded-sm" />
          ))}
        </div>
        <Skeleton className="w-80 h-6 rounded-sm" />
        <div className="flex gap-6">
          <Skeleton className="size-36 rounded-lg" />
          <Skeleton className="size-36 rounded-lg" />
        </div>
        <Skeleton className="w-60 h-10 rounded-full" />
      </div>
    </div>
  );
}
