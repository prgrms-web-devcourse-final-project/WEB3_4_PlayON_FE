import { game, useGame } from '@/api/game';
import SectionTitle from '@/components/common/SectionTitle';
import PickCard from '@/components/game/PickCard';
import { useAuthStore } from '@/stores/authStore';
import { gameDetail } from '@/types/games';
import { dummyGameDetail } from '@/utils/dummyData';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function PartyMemberPicks() {
  const game = useGame();
  const { user } = useAuthStore();
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
  const { data: friendGames, isSuccess: friendGamesIsSuccess } = useSuspenseQuery({
    queryKey: ['FriendGames'],
    queryFn: async () => {
      try {
        const appIds = (await game.GameRecommendFriend()).slice(0, 4).map((e) => e.appid);
        const gameData = await Promise.all(
          appIds.map(async (appid) => {
            const data = await game.GameDetailWithPartyLog(appid);
            if (data === undefined) return undefined;
            return { ...convertToClientGame(data.game), appid: appid };
          })
        );
        return gameData.filter((e) => e !== undefined);
      } catch (e) {
        console.log(e);
        return [
          { ...dummyGameDetail, appid: 1 },
          { ...dummyGameDetail, appid: 1 },
          { ...dummyGameDetail, appid: 1 },
          { ...dummyGameDetail, appid: 1 },
        ];
      }
    },
    staleTime: Infinity,
  });

  return (
    <section className="wrapper">
      <SectionTitle
        title="파티원 PICK"
        subtitle="최근 함께 파티에 참여한 유저들이 플레이했어요"
        icon_src="/img/icons/pixel_chat_heart.svg"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
        {user && friendGamesIsSuccess && friendGames.length > 0 ? (
          friendGames.map((e, ind) => <PickCard data={e} appid={e.appid} key={`friendGames_${ind}`} />)
        ) : (
          <>
            <PickCard data={dummyGameDetail} appid={730} />
            <PickCard data={dummyGameDetail} appid={730} />
            <PickCard data={dummyGameDetail} appid={730} />
            <PickCard data={dummyGameDetail} appid={730} />
          </>
        )}
      </div>
    </section>
  );
}
