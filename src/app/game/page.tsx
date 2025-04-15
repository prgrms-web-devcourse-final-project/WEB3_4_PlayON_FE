'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import SectionTitle from '@/components/common/SectionTitle';
import PickCard from '@/components/game/PickCard';
import PopularCard from '@/components/game/PopularCard';
import SteamCard from '@/components/game/SteamCard';
import { dummyGameDetail, dummyGameSimple } from '@/utils/dummyData';
import styles from './game.module.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import { game, useGame } from '@/api/game';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useAuthStore } from '@/stores/authStore';
import { gameDetail } from '@/types/games';
import Link from 'next/link';
import GameSearch from '@/components/common/GameSearch';

export default function Game() {
  const imageList = [
    { title: 'Split Fiction', img_src: '/img/hero/bg_game_1.webp' },
    { title: 'Unravel Two', img_src: '/img/hero/bg_game_3.webp' },
    { title: "No Man's Sky", img_src: '/img/hero/bg_game_2.webp' },
  ];
  const game = useGame();
  const router = useRouter();
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
  const { data: popularGames } = useSuspenseQuery({
    queryKey: ['PopularGames'],
    queryFn: game.GamePopular,
    staleTime: Infinity,
  });
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
  const { data: personalGames, isSuccess: personalGamesIsSuccess } = useSuspenseQuery({
    queryKey: ['PersonalGames'],
    queryFn: async () => {
      try {
        const appIds = (await game.GameRecommendGenre()).map((e) => e.appid);
        const gameData = await Promise.all(
          appIds.map(async (appid) => {
            const data = await game.GameDetailWithPartyLog(appid);
            if (data === undefined) return undefined;
            return { ...convertToClientGame(data.game), appid: appid };
          })
        );
        return gameData.slice(0, 4).filter((e) => e !== undefined);
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
    retryOnMount: false,
  });
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
    retryOnMount: false,
  });
  const { data: steamRanking } = useSuspenseQuery({
    queryKey: ['SteamRanking'],
    queryFn: async () => {
      const data = await game.GameRanking();
      if (!data) return [];
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
  });

  return (
    <main className="mb-20 space-y-20">
      <section>
        <div className="bg-purple-400/20 w-full h-[800px]">
          <div className="w-screen relative">
            <div className="w-full h-[520px] mt-[68px] relative">
              <HeroSwiperBanner data={imageList} />
            </div>
            <div className="w-[1280px] absolute left-1/2 -translate-x-1/2 top-48 z-10 space-y-7">
              <div className="w-[640px] place-self-center mb-20 bg-white rounded-lg">
                <GameSearch onSelect={(value) => router.push(GAME_ROUTE.game_list + `?name=${value.name}`)} />
              </div>
              <div className={`box-content w-[340px] bg-white rounded-xl place-self-center ${styles.chatBubble}`}>
                <div className="py-3 space-y-2 ">
                  <p className="font-suit text-base font-medium leading-5 text-center">플레이온 유저들의 선택</p>
                  <p className="font-suit text-4xl font-black text-purple-700 text-center">BEST CHOICE</p>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-3 gap-6 pt-4">
                <Suspense>
                  {popularGames.map((e) => (
                    <Link href={GAME_ROUTE.game_detail(e.appid)} key={e.appid}>
                      <PopularCard data={e} />
                    </Link>
                  ))}
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <PlayOnRollingBanner duration={20} direction="left" />
      </section>

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
              <PickCard data={dummyGameDetail} appid={0} />
              <PickCard data={dummyGameDetail} appid={0} />
              <PickCard data={dummyGameDetail} appid={0} />
              <PickCard data={dummyGameDetail} appid={0} />
            </>
          )}
        </div>
      </section>

      <section className="w-full">
        <div className="bg-[url('/img/hero/bg_gameList_5.webp')] bg-cover bg-center size-full">
          <div className="bg-purple-800/60 size-full backdrop-blur-md">
            <div className="wrapper py-12 space-y-8">
              <p className="text-5xl font-suit font-bold text-white">STEAM RANKING</p>

              <div className="flex gap-6">
                <Link href={GAME_ROUTE.game_detail(steamRanking ? steamRanking[0].appid : 1)}>
                  <div className="w-[845px] h-[394px] space-y-8">
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
                        {' '}
                        {steamRanking ? steamRanking[0].title : ''}
                      </p>
                      <p className="text-lg text-white font-medium">
                        {' '}
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
      <section className="wrapper space-y-20">
        <div className="space-y-8">
          <SectionTitle
            title={`${user ? user.nickname + '님 맞춤 추천' : '이런 게임은 어떠세요?'}`}
            subtitle="내가 좋아하는 장르 위주로"
            icon_src="/img/icons/pixel_present.svg"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {personalGamesIsSuccess && personalGames.length > 0 ? (
              personalGames.map((e, ind) => <PickCard data={e} key={`personal_${ind}`} appid={e.appid} />)
            ) : (
              <>
                <PickCard data={dummyGameDetail} appid={730} />
                <PickCard data={dummyGameDetail} appid={730} />
                <PickCard data={dummyGameDetail} appid={730} />
                <PickCard data={dummyGameDetail} appid={730} />
              </>
            )}
          </div>
        </div>

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
      </section>
    </main>
  );
}
