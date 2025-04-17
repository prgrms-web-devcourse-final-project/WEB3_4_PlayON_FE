'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import SectionTitle from '@/components/common/SectionTitle';
import PickCard from '@/components/game/PickCard';
import PopularCard from '@/components/game/PopularCard';
import SteamCard from '@/components/game/SteamCard';
import {
  dummyGameSimple,
  gamesPopularDummyData,
  steamBaldursGate,
  steamCounterStrike,
  steamRankingDummyData,
} from '@/utils/dummyData';
import styles from './game.module.css';
import { useQuery } from '@tanstack/react-query';
import { game, useGame } from '@/api/game';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useAuthStore } from '@/stores/authStore';
import { gameDetail } from '@/types/games';
import Link from 'next/link';
import GameSearch from '@/components/common/GameSearch';
import BounceButton from '@/components/common/BounceButton';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
import { PARTY_ROUTE } from '@/constants/routes/party';
import { mainDummyMyGames, mainDummyGamesAppId, mainDummyGames } from '@/utils/dummyData';

export default function Game() {
  const imageList = [
    { title: 'Split Fiction', img_src: '/img/hero/bg_game_1.webp' },
    { title: 'Unravel Two', img_src: '/img/hero/bg_game_3.webp' },
    { title: "No Man's Sky", img_src: '/img/hero/bg_game_2.webp' },
  ];
  const game = useGame();
  const router = useRouter();
  const { user, hasHydrated } = useAuthStore();
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
  const { data: popularGames } = useQuery({
    queryKey: ['PopularGames'],
    queryFn: async () => {
      const res = await game.GamePopular();
      return res;
    },
  });
  const { data: friendGames, isSuccess: friendGamesIsSuccess } = useQuery({
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
        return [];
      }
    },
  });
  const { data: personalGames, isSuccess: personalGamesIsSuccess } = useQuery({
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
        return [];
      }
    },
  });
  const { data: playTimeGames } = useQuery({
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
  });
  const { data: steamRanking } = useQuery({
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
  });

  type gameDetailWithAppId = gameDetail & { appid: number };
  const PersonalRecommendationSection = (games: gameDetailWithAppId[]) => {
    return (
      <>
        <SectionTitle
          title={`${user ? user.nickname + '님 맞춤 추천' : '이런 게임은 어떠세요?'}`}
          subtitle="내가 좋아하는 장르 위주로"
          icon_src="/img/icons/pixel_present.svg"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
          {games.map((e, ind) => (
            <PickCard data={e as gameDetail} key={`personal_${ind}`} appid={e.appid} />
          ))}
        </div>
      </>
    );
  };
  const LongPlayTimeSection = (games: gameDetailWithAppId[]) => {
    return (
      <>
        <SectionTitle
          title="플레이타임 긴 게임들"
          subtitle="오래해도 떨어지지 않는 재미"
          icon_src="/img/icons/pixel_box.svg"
        />
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
          {games.map((e, ind) => (
            <Link href={GAME_ROUTE.game_detail(e.appid)} key={`playTimeGames_${ind}`}>
              <PopularCard
                data={{ appid: e.appid, background_src: '', genre: e.genre, img_src: e.img_src, title: e.title }}
              />
            </Link>
          ))}
        </div>
      </>
    );
  };
  const PartyMemberPicks = (games: gameDetailWithAppId[]) => {
    return (
      <div className="">
        <SectionTitle
          title="파티원 PICK"
          subtitle="최근 함께 파티에 참여한 유저들이 플레이했어요"
          icon_src="/img/icons/pixel_chat_heart.svg"
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
          {games.map((e, ind) => (
            <PickCard data={e} appid={e.appid} key={`friendGames_${ind}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <main
      style={{
        backgroundImage: 'linear-gradient(to top, #f3e8ff 0%, rgba(255,255,255,0) 100%)',
        backgroundSize: '100% 40%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
      }}
      className="pb-20 space-y-20"
    >
      {/* 헤더 & 인기 */}
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
                {popularGames &&
                  popularGames.length > 0 &&
                  popularGames.map((e) => (
                    <Link href={GAME_ROUTE.game_detail(e.appid)} key={e.appid}>
                      <PopularCard data={e} />
                    </Link>
                  ))}
                {(!popularGames || popularGames.length <= 0) &&
                  gamesPopularDummyData.map((e) => <PopularCard data={e} key={`popular_${e.appid}`} />)}
              </div>
            </div>
          </div>
        </div>
        <PlayOnRollingBanner duration={20} direction="left" />
      </section>
      {/* 최근에 파티 같이 한 사람 추천 */}
      <section className="wrapper">
        {friendGames && friendGames.length > 0 && PartyMemberPicks(friendGames)}
        {!friendGames ||
          (friendGames.length <= 0 && (
            <>
              <SectionTitle
                title="파티를 모집해보세요!"
                subtitle="이런...! 아직 파티를 이룬적이 없군요"
                icon_src="/img/icons/pixel_chat_heart.svg"
              />
              <EmptyLottie className="w-[500px] -translate-y-6" text="" imgWidth={400}>
                <RetroButton
                  type="purple"
                  className="mt-4 font-bold"
                  callback={() => {
                    router.push(PARTY_ROUTE.party);
                  }}
                >
                  파티 하러 가기!
                </RetroButton>
              </EmptyLottie>
            </>
          ))}
      </section>
      {/* 스팀 순위 */}
      <section className="w-full">
        <div className="bg-[url('/img/hero/bg_gameList_5.webp')] bg-cover bg-center size-full">
          <div className="bg-purple-800/60 size-full backdrop-blur-md">
            <div className="wrapper py-12 space-y-8">
              <p className="text-5xl font-suit font-bold text-white">STEAM RANKING</p>
              <div className="flex gap-6">
                <Link href={GAME_ROUTE.game_detail(steamRanking ? steamRanking[0].appid : steamCounterStrike.appid)}>
                  <div className="min-w-[845px] space-y-8">
                    <div className="relative pt-3">
                      <img
                        src={steamRanking ? steamRanking[0].img_src : steamCounterStrike.img_src}
                        alt=""
                        className="w-full rounded-xl bg-neutral-400 object-cover"
                      />
                      <div className="absolute top-0 left-0 pt-6 pl-3 w-32">
                        <img src="/img/laurel/laurel_1st.png" alt="" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="font-suit text-5xl font-bold text-white">
                        {steamRanking ? steamRanking[0].title : steamCounterStrike.title}
                      </p>
                      <p className="text-lg text-white font-medium">
                        {steamRanking ? steamRanking[0].genre.join(', ') : []}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="hidden xl:grid grid-cols-2 gap-6 w-[411px]">
                  {steamRanking && steamRanking.length > 0
                    ? steamRanking.slice(1, 5).map((e, ind) => (
                        <Link href={GAME_ROUTE.game_detail(e.appid)} key={`steamRanking_${ind + 1}`}>
                          <SteamCard theme="dark" data={e} className="min-w-24" />
                        </Link>
                      ))
                    : steamRankingDummyData.slice(1, 5).map((e, ind) => (
                        <Link href={GAME_ROUTE.game_detail(e.appid ?? 730)} key={`steamRanking_${ind + 1}`}>
                          <SteamCard theme="dark" data={e} className="min-w-24" />
                        </Link>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 개인화 추천 & 플레이 타임 긴 게임 */}
      <section className="wrapper space-y-20">
        <div className="space-y-8">
          {}
          {personalGamesIsSuccess && personalGames.length > 0 && PersonalRecommendationSection(personalGames)}
          {(!personalGamesIsSuccess || personalGames.length <= 0) && (
            <>
              <SectionTitle
                title={`${user ? user.nickname + '님 맞춤 추천' : '이런 게임은 어떠세요?'}`}
                subtitle="인기 있는 장르 위주로"
                icon_src="/img/icons/pixel_present.svg"
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
                {mainDummyGames.map((e, ind) => (
                  <PickCard data={e} appid={mainDummyGamesAppId[ind]} key={mainDummyGamesAppId[ind]} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="space-y-8">
          {hasHydrated && playTimeGames && playTimeGames.length > 0 && LongPlayTimeSection(playTimeGames)}
          {!hasHydrated ||
            ((!playTimeGames || playTimeGames.length <= 0) && (
              <>
                <SectionTitle
                  title="플레이타임 긴 게임들"
                  subtitle="오래해도 떨어지지 않는 재미"
                  icon_src="/img/icons/pixel_box.svg"
                />
                <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                  {(!popularGames || popularGames.length <= 0) &&
                    gamesPopularDummyData.map((e) => <PopularCard data={e} key={`playtime_${e.appid}`} />)}
                </div>
              </>
            ))}
        </div>
        <BounceButton path={GAME_ROUTE.game_list} type="game" tootip="게임 찾기" />{' '}
      </section>
    </main>
  );
}
