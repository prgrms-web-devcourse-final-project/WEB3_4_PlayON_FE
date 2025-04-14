import { useGame } from '@/api/game';
import PopularCard, { PopularCardSkeleton } from '@/components/game/PopularCard';
import { GAME_ROUTE } from '@/constants/routes/game';
import { gameSimple } from '@/types/games';
import { dummyGameSimple } from '@/utils/dummyData';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function PopularCardSection() {
  const game = useGame();

  const popularCardFallback: gameSimple[] = [dummyGameSimple, dummyGameSimple, dummyGameSimple];

  const { data: popularGames } = useSuspenseQuery({
    queryKey: ['PopularGames'],
    queryFn: async () => {
      try {
        const data = await game.GamePopular();
        return data.map((e) => ({
          background_src: '',
          appid: e.appid,
          genre: e.genres,
          img_src: e.headerImage,
          title: e.name,
        }));
      } catch (error) {
        console.log(error);
        return [
          { ...dummyGameSimple, appid: 1 },
          { ...dummyGameSimple, appid: 1 },
          { ...dummyGameSimple, appid: 1 },
        ];
      }
    },
    staleTime: Infinity,
  });

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-6 pt-4">
      {popularGames &&
        popularGames.map((e) => (
          <Link href={GAME_ROUTE.game_detail(e.appid)} key={e.appid}>
            <PopularCard data={e} />
          </Link>
        ))}
      {(!popularGames || popularGames.length < 3) &&
        popularCardFallback.map((e, ind) => <PopularCard data={e} key={`popularcard_fallback_${ind}`} />)}
    </div>
  );
}
