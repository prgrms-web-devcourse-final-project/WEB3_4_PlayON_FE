import { GuildHorizonSkeleton } from '@/components/guild/guild-horizon';

export default function PopularGuildListSkeleton() {
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, idx) => (
          <GuildHorizonSkeleton key={idx} className="" />
        ))}
      </div>
    </>
  );
}
