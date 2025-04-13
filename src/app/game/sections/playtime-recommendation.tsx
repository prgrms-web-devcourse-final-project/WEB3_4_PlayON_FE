import { game, useGame } from '@/api/game';
import SectionTitle from '@/components/common/SectionTitle';
import PopularCard from '@/components/game/PopularCard';
import { GAME_ROUTE } from '@/constants/routes/game';
import { gameDetail } from '@/types/games';
import { dummyGameSimple } from '@/utils/dummyData';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Suspense } from 'react';

export default function PlaytimeRecommendation() {
  const game = useGame();

  function convertToClientGame(data: game): gameDetail {
    return {
      about: data.aboutTheGame,
      detail_desc: data.aboutTheGame,
      developer: [data.developers],
      genre: data.genres,
      homepage_url: data.website,
      img_src: data.headerImage,
      movie_src: data.movies,
      screenshot_src: data.screenshots,
      os: {
        linux: data.isLinuxSupported,
        mac: data.isMacSupported,
        windows: data.isWindowsSupported,
      },
      publisher: [data.publishers],
      release_date: data.releaseDate,
      short_desc: data.shortDescription,
      title: data.name,
    };
  }
  const { data: playTimeGames } = useSuspenseQuery({
    queryKey: ['PlayTimeGames'],
    queryFn: async () => {
      const appIds = (await game.GameMostPlayTime()).map((e) => e.appid);
      const gameData = await Promise.all(
        appIds.map(async (appid) => {
          const data = await game.GameDetailWithPartyLog(appid);
          if (data === undefined) return undefined;
          return { ...convertToClientGame(data.game), appid: appid };
        })
      );
      return gameData.slice(0, 3).filter((e) => e !== undefined);
    },
    staleTime: Infinity,
  });
  return (
    <div className="space-y-8">
      <SectionTitle
        title="플레이타임 긴 게임들"
        subtitle="오래해도 떨어지지 않는 재미"
        icon_src="/img/icons/pixel_box.svg"
      />
      <Suspense>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
          {playTimeGames.length > 0 ? (
            playTimeGames.map((e, ind) => (
              <Link href={GAME_ROUTE.game_detail(e.appid)} key={`playTimeGames_${ind}`}>
                <PopularCard data={e} />
              </Link>
            ))
          ) : (
            <>
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
}
