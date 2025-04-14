import { useGame } from '@/api/game';
import SteamCard from '@/components/game/SteamCard';
import { GAME_ROUTE } from '@/constants/routes/game';
import { dummyGameSimple } from '@/utils/dummyData';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function SteamRankingSection() {
  const game = useGame();

  const dataFallback: {
    background_src: string;
    appid: number;
    genre: string[];
    img_src: string;
    title: string;
  }[] = [
    {
      appid: 730,
      title: 'Counter Strike 2',
      img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
      genre: ['Action', 'Free To Play'],
      background_src: '',
    },
    {
      appid: 3241660,
      title: 'R.E.P.O.',
      img_src:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3241660/1ea445e044a2d5b09cfa8291350b63ebed6e5741/header.jpg',
      genre: ['Action', 'Early Access'],
      background_src: '',
    },
    {
      appid: 578080,
      title: 'PUBG: BATTLEGROUNDS',
      img_src:
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/841ea38bc58cabb70aef65365cf50bc2d79329d9/header.jpg',
      genre: ['Action', 'Free To Play'],
      background_src: '',
    },
    {
      appid: 1086940,
      title: "Baldur's Gate 3",
      img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
      genre: ['Adventure', 'RPG', 'Strategy'],
      background_src: '',
    },
    {
      appid: 1174180,
      title: 'Red Dead Redemption 2',
      img_src: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1720558643',
      genre: ['Action', 'Adventure'],
      background_src: '',
    },
  ];

  const { data: steamRanking } = useSuspenseQuery({
    queryKey: ['SteamRanking'],
    queryFn: async () => {
      const data = await game.GameRanking();
      if (!data) return dataFallback;
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
          <div className="wrapper py-12 space-y-8 flex flex-col">
            <p className="text-5xl font-suit font-bold text-white w-full">STEAM RANKING</p>
            <div className="flex gap-6">
              <Link href={GAME_ROUTE.game_detail(steamRanking ? steamRanking[0].appid : 1)}>
                <div className="w-[800px] space-y-8 ">
                  <div className="relative pt-3">
                    <img src={steamRanking ? steamRanking[0].img_src : ''} className="w-full rounded-xl object-cover" />
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
