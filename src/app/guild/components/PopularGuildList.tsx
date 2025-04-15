import { useGuild } from '@/api/guild';
// import EmptyLottie from '@/components/common/EmptyLottie';
// import RetroButton from '@/components/common/RetroButton';
import GuildHorizon from '@/components/guild/guild-horizon';
// import { GUILD_ROUTE } from '@/constants/routes/guild';
import { useSuspenseQuery } from '@tanstack/react-query';
// import Link from 'next/link';

export default function PopularGuildList() {
  const Guild = useGuild();

  const { data: popularGuildList } = useSuspenseQuery({
    queryKey: ['PopularGuilds'],
    queryFn: () => Guild.GetGuildPopular(),
    staleTime: 100,
  });
  if (!popularGuildList) return;
  // (
  //     <div className="w-full text-center justify-self-center place-self-center">
  //       <EmptyLottie className="w-[400px]" text="직접 길드를 만들고 활동해보세요!">
  //         <Link href={GUILD_ROUTE.guild_create}>
  //           <RetroButton type="purple" className="mt-10 font-bold">
  //             길드 만들기
  //           </RetroButton>
  //         </Link>
  //       </EmptyLottie>
  //     </div>
  //   );
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {popularGuildList.map((guild) => (
          <GuildHorizon key={guild.guild_id} data={guild} />
        ))}
      </div>
    </>
  );
}
