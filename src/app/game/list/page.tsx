'use client';

import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Switch } from '@/components/ui/switch';
import { dummyGameDetail2 } from '@/utils/dummyData';
import PickCard from '@/components/game/PickCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGame, game } from '@/api/game';
import { Suspense, useEffect, useRef, useState } from 'react';
import typeConverter from '@/utils/typeConverter';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
import { gameDetail } from '@/types/games';
import CustomPagination from '@/components/common/CustomPagination';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GAME_ROUTE } from '@/constants/routes/game';
import { Skeleton } from '@/components/ui/skeleton';
import GameSearch from '@/components/common/GameSearch';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
import { useToast } from '@/hooks/use-toast';

export default function GameList() {
  const imageList = [
    { title: 'Bioshock: Infinite', img_src: '/img/hero/bg_gameList_1.webp' },
    { title: 'Cuphead', img_src: '/img/hero/bg_gameList_2.webp' },
    { title: 'Persona 3: Reload', img_src: '/img/hero/bg_gameList_3.webp' },
    { title: 'Civilization VII', img_src: '/img/hero/bg_gameList_4.webp' },
    { title: 'Dark Souls 3', img_src: '/img/hero/bg_gameList_5.webp' },
  ];
  const dummyGames = new Array(12).fill(dummyGameDetail2);

  const genres = ['액션', '인디', '어드벤처', '시뮬레이션', 'RPG', '전략', '캐주얼'] as const;
  const playerTypes = ['멀티플레이', '싱글플레이'] as const;
  const releaseStatuses = ['발매', '출시예정'] as const;
  const [genre, setGenre] = useState<boolean[]>([true, ...genres.map(() => false)]);
  const [playerType, setPlayerType] = useState<boolean[]>([...playerTypes.map(() => false)]);
  const [releaseStatus, setReleaseStatus] = useState<boolean[]>([...releaseStatuses.map(() => false)]);

  const [keyword, setKeyword] = useState<string>('');
  const [mac, setMac] = useState(false);
  const [releaseDate, setReleaseDate] = useState<Date | undefined>(undefined);

  const searchParams = useSearchParams();
  const totalItems = useRef(48);

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
  const game = useGame();
  const { data, refetch, isFetched, isLoading } = useSuspenseQuery({
    queryKey: ['GameList'],
    queryFn: async () => {
      const playerTypeInd = playerType.findIndex((e) => e === true);
      const releaseStatusInd = releaseStatus.findIndex((e) => e === true);

      const data = await game.GameSearch(
        {
          keyword: keyword.length > 0 ? keyword : undefined,
          genres: genre[0]
            ? undefined
            : genre
                .map((e, ind) => (e ? typeConverter('GameGenreTags', 'KoToEn', genres[ind - 1]) : undefined))
                .filter((e) => e !== undefined)
                .join(','),
          releaseAfter: releaseDate,
          isMacSupported: mac,
          playerType: typeConverter('GamePlayerTypeTags', 'KoToEn', playerTypes[playerTypeInd]),
          releaseStatus: typeConverter('GameReleaseStatusTags', 'KoToEn', releaseStatuses[releaseStatusInd]),
        },
        {
          page: Number(searchParams.get('page')) || 1,
          size: 12,
          sort: [],
        }
      );
      if (data) {
        totalItems.current = data.totalItems;
        const appIds = data.items.map((e) => e.appid);
        const gameData = await Promise.all(
          appIds.map(async (appid) => {
            const data = await game.GameDetailWithPartyLog(appid);
            if (data === undefined) return undefined;
            return { ...convertToClientGame(data.game), appid: appid };
          })
        );
        return gameData.filter((e) => e !== undefined);
      }
      return dummyGames;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const Genre = searchParams.get('genre')?.split(',');
    const PlayerType = searchParams.get('playerType');
    const ReleaseStatus = searchParams.get('releaseStatus');
    const Mac = searchParams.get('mac');
    const Keyword = searchParams.get('name');
    const ReleaseDate = searchParams.get('releaseDate');

    if (Genre) {
      setGenre([false, ...genres.map((e) => Genre.includes(e))]);
    }
    if (PlayerType) setPlayerType(PlayerType === '멀티플레이' ? [true, false] : [false, true]);
    if (ReleaseStatus) setReleaseStatus(ReleaseStatus === '발매' ? [true, false] : [false, true]);
    console.log(releaseStatus);
    if (Mac) setMac(Mac === 'true' ? true : false);
    if (Keyword) setKeyword(Keyword);
    if (ReleaseDate) setReleaseDate(new Date(ReleaseDate));
  }, []);
  useEffect(() => {
    const newUrl = new URL(window.location.href);
    if (!genre[0]) {
      const Genre = genre
        .slice(1, genre.length)
        .map((e, ind) => (e ? genres[ind] : null))
        .filter((e) => e);
      newUrl.searchParams.set('genre', Genre.join(','));
    } else {
      newUrl.searchParams.delete('genre');
    }
    const playerTypeInd = playerType.findIndex((e) => e === true);
    const playerTypeValue = playerTypes[playerTypeInd];
    if (playerTypeInd !== -1) {
      newUrl.searchParams.set('playerType', playerTypeValue);
    } else {
      newUrl.searchParams.delete('playerType');
    }
    const releaseStatusInd = releaseStatus.findIndex((e) => e === true);
    console.log(releaseStatusInd);
    const releaseStatusValue = releaseStatuses[releaseStatusInd];
    if (releaseStatusInd !== -1) {
      newUrl.searchParams.set('releaseStatus', releaseStatusValue);
    } else {
      newUrl.searchParams.delete('releaseStatus');
    }
    if (mac) {
      newUrl.searchParams.set('mac', String(mac));
    } else {
      newUrl.searchParams.delete('mac');
    }
    if (keyword) {
      newUrl.searchParams.set('name', keyword);
    } else {
      newUrl.searchParams.delete('name');
    }
    if (releaseDate) {
      newUrl.searchParams.set('releaseDate', String(releaseDate));
    } else {
      newUrl.searchParams.delete('releaseDate');
    }
    window.history.pushState({}, '', newUrl);
  }, [genre, playerType, releaseStatus, mac, releaseDate, keyword, playerTypes, releaseStatuses, genres]);
  useEffect(() => {
    refetch();
  }, [refetch, genre, playerType, releaseStatus, mac, releaseDate, keyword]);

  const ImFeelingLucky = async () => {
    try {
      const response = await game.GameSearch({});
      if (response && response.totalItems) {
        const totalItems = response.totalItems;
        const randomNumber = Math.floor(Math.random() * totalItems);
        const q = Math.trunc(randomNumber / 12) + 1;
        const r = randomNumber % 12;
        const response2 = await game.GameSearch({}, { page: q, size: r });
        if (response2 && response2.items && response2.items.length > r) {
          const location = response2.items[r];
          router.push(GAME_ROUTE.game_detail(location.appid));
          return;
        }
      }
      throw new Error('Failed to feel lucky');
    } catch {
      toast({ title: '도전 과제 달성?', description: '오늘은 운이 좀 없네?', variant: 'destructive' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <section className="w-full h-[520px]">
        <HeroSwiperBanner data={imageList} />
      </section>
      <div
        className="relative rounded-3xl w-[1000px] h-[400px] mt-[-300px] z-10 border border-neutral-300"
        style={{ backdropFilter: 'blue(80)', backgroundColor: 'rgba(255,255,255,0.9)' }}
      >
        <p className="text-white absolute right-0 translate-y-[-100%] text-3xl font-extrabold -mt-2">
          찾으시는 게임이 있으신가요?
        </p>
        <div className="flex flex-col pt-8 px-12 pb-10">
          <div className="flex flex-col flex-auto gap-2 ">
            <p className="font-bold">게임 이름</p>
            <div className="flex gap-10">
              <div className="flex flex-auto items-center rounded-lg bg-white gap-2">
                <GameSearch onSelect={(e) => setKeyword(e.name)} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={mac} onCheckedChange={(e) => setMac(e)} />
                <p>맥OS 지원</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시일 (선택일 이후)`}</p>
              <DateTimePicker
                init={undefined}
                onSelect={(date) => {
                  setReleaseDate(date);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시일 (선택일 이후)`}</p>
              <CoolerCategoryMenu
                state={releaseStatus}
                setState={setReleaseStatus}
                className="flex gap-2"
                type="single"
              >
                {[...releaseStatuses].map((item, item_ind) => (
                  <TiltToggle label={item} toggle={releaseStatus[item_ind]} key={`releaseStatus_${item}`} />
                ))}
              </CoolerCategoryMenu>
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`플레이어`}</p>
              <CoolerCategoryMenu state={playerType} setState={setPlayerType} className="flex gap-2" type="single">
                {[...playerTypes].map((item, item_ind) => (
                  <TiltToggle label={item} toggle={playerType[item_ind]} key={`playerType_${item}`} />
                ))}
              </CoolerCategoryMenu>
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`인기 장르`}</p>
              <CoolerCategoryMenu state={genre} setState={setGenre} className="flex gap-2" type="multiple" enableAll>
                {['전체', ...genres].map((item, item_ind) => (
                  <TiltToggle label={item} toggle={genre[item_ind]} key={`genre_${item}`} />
                ))}
              </CoolerCategoryMenu>
            </div>
          </div>
        </div>
      </div>
      <Suspense>
        {isFetched && data.length > 0 && (
          <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
            {data.map((e, ind) => (
              <Link href={GAME_ROUTE.game_detail(e.appid)} key={ind}>
                <PickCard data={e} />
              </Link>
            ))}
          </div>
        )}
      </Suspense>
      {(!isFetched || isLoading) && (
        <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
          {data.map((_, ind) => (
            <Skeleton className="w-full aspect-square rounded-full" key={`Skeleton_Games_${ind}`} />
          ))}
        </div>
      )}
      {isFetched && data.length <= 0 && (
        <div className="w-full text-center mt-[100px] mb-[100px]">
          <EmptyLottie className="w-[400px]" text="원하는 게임이 없으신가요?">
            <RetroButton type="purple" className="mt-10 font-bold" callback={() => ImFeelingLucky()}>
              {`I'm Feeling Lucky`}
            </RetroButton>
          </EmptyLottie>
        </div>
      )}
      {isFetched && data.length > 0 && (
        <div className="mt-[100px] mb-[100px]">
          <CustomPagination pageSize={12} totalItems={totalItems.current} />
        </div>
      )}
    </div>
  );
}
