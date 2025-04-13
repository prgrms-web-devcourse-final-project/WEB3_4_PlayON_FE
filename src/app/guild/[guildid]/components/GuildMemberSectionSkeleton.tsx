import { Skeleton } from '@/components/ui/skeleton';

export default function GuildMemberSectionSkeleton() {
  return (
    <div className="flex flex-col w-[67%] self-center gap-8">
      <p className="text-4xl font-bold text-neutral-900">멤버</p>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="box-content rounded-lg border border-neutral-300 px-6 py-8 cursor-pointer">
            <div key={idx} className="flex gap-5">
              <div className="w-16 h-16 aspect-square relative ">
                <Skeleton className="size-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-44 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
