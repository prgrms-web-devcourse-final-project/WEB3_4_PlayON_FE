import { useGame } from '@/api/game';
import SteamCard from '@/components/game/SteamCard';
import { GAME_ROUTE } from '@/constants/routes/game';
import { dummyGameSimple } from '@/utils/dummyData';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function SteamRankingSection() {
  const game = useGame();

  const { data: steamRanking } = useSuspenseQuery({
    queryKey: ['SteamRanking'],
    queryFn: async () => {
      const data = await game.GameRanking();
      if (!data) return undefined;
      return data.map((e) => {
        return {
          background_src: '',
          appid: e.appid,
          genre: e.genres,
          img_src: e.headerImage,
          title: e.name,
        };
      });
    },
    staleTime: Infinity,
  });
  return (
    <section className="w-full">
      <div className="bg-[url('/img/hero/bg_gameList_5.webp')] bg-cover bg-center size-full">
        <div className="bg-purple-800/60 size-full backdrop-blur-md">
          <div className="wrapper py-12 space-y-8">
            <p className="text-5xl font-suit font-bold text-white">STEAM RANKING</p>

            <div className="flex gap-6 justify-center">
              <Link href={GAME_ROUTE.game_detail(steamRanking ? steamRanking[0].appid : 1)}>
                <div className="w-[700px] space-y-8">
                  <div className="relative pt-3">
                    <img
                      src={steamRanking ? steamRanking[0].img_src : ''}
                      className="w-full rounded-xl bg-neutral-400 object-cover"
                    />
                    <div className="absolute top-0 left-0 pt-6 pl-3 w-32">
                      <img src="/img/laurel/laurel_1st.png" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-suit text-5xl font-bold text-white">
                      {steamRanking ? steamRanking[0].title : ''}
                    </p>
                    <p className="text-lg text-white font-medium">
                      {steamRanking ? steamRanking[0].genre.join(', ') : []}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-6 w-[411px]">
                {steamRanking && steamRanking.length > 0 ? (
                  steamRanking.slice(1, 5).map((e, ind) => (
                    <Link href={GAME_ROUTE.game_detail(e.appid)} key={`steamRanking_${ind + 1}`}>
                      <SteamCard theme="dark" data={e} />
                    </Link>
                  ))
                ) : (
                  <>
                    <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                    <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                    <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                    <SteamCard data={dummyGameSimple} className="text-white" theme="dark" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
