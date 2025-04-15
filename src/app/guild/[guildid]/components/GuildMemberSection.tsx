import { useGuild } from '@/api/guild';
import GuildUserCard from '@/components/guildUser/GuildUserCard';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function GuildMemberSection({ guildId }: { guildId: string }) {
  const Guild = useGuild();

  const { data: guildMemberData } = useSuspenseQuery({
    queryKey: ['GuildMember', guildId],
    queryFn: () => Guild.GetGuildMembers(guildId),
  });
  // console.log(guildMemberData);
  return (
    <div className="flex flex-col w-[67%] self-center gap-8">
      <p className="text-4xl font-bold text-neutral-900">멤버</p>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6">
        {guildMemberData && guildMemberData.map((member) => <GuildUserCard key={member.member_id} data={member} />)}
      </div>
    </div>
  );
}
