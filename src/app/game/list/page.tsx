import HeroSwiperBanner from '@/components/common/HeroSwiperBanner';
import CustomGameSearch from './components/CustomGameSearch';
import CustomMacSwitch from './components/CustomMacSwitch';
import { CustomDateTimePicker } from './components/CustomDateTimePicker';
import axios from 'axios';
import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import CustomReleaseStatus from './components/CustomReleaseStatus';
import CustomPlayerType from './components/CustomPlayerType';
import CustomGenres from './components/CustomGenres';
import { game, party, partyLog } from '@/api/game';
import { gameDetail } from '@/types/games';
import CustomPagination from '@/components/common/CustomPagination';
import EmptyLottie from '@/components/common/EmptyLottie';
import PickCard from '@/components/game/PickCard';
import ImFeelingLuckyBtn from './components/ImFeelingLuckyBtn';
import typeConverter from '@/utils/typeConverter';
import CustomResetComponent from './components/CustomResetComponent';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const imageList = [
  { title: 'Bioshock: Infinite', img_src: '/img/hero/bg_gameList_1.webp' },
  { title: 'Cuphead', img_src: '/img/hero/bg_gameList_2.webp' },
  { title: 'Persona 3: Reload', img_src: '/img/hero/bg_gameList_3.webp' },
  { title: 'Civilization VII', img_src: '/img/hero/bg_gameList_4.webp' },
  { title: 'Dark Souls 3', img_src: '/img/hero/bg_gameList_5.webp' },
];
const genres = ['액션', '인디', '어드벤처', '시뮬레이션', 'RPG', '전략', '캐주얼'] as const;
const playerTypes = ['멀티플레이', '싱글플레이'] as const;
const releaseStatuses = ['발매', '출시예정'] as const;

type Step = {
  keyword: string;
  isMacSupported: string;
  releaseDate: string;
  playerType: string;
  releaseStatus: string;
  genres: (string | undefined)[];
};
type Pagination = {
  page: number;
  size: number;
  sort: string[];
};
async function fetchGameScreenshots(
  step: Step,
  pagination: Pagination
): Promise<[totalItems: number, appIds: number[], validData: gameDetail[]]> {

  const response = await axios.post(API_BASE_URL + GAME_ENDPOINTS.list, { ...step }, { params: { ...pagination } });
  const totalItems = response.data.data.totalItems;
  const appIds: number[] = response.data.data.items.map(
    (_: { appid: number; name: string; headerImage: string; genres: string[] }) => _.appid
  );
  const gameData = await Promise.all(
    appIds.map(async (appid: number) => {
      const detailResponse = await axios.get(API_BASE_URL + GAME_ENDPOINTS.details(appid));
      if (detailResponse && detailResponse.status === 200) {
        return {
          game: detailResponse.data.data.game as game,
          partyList: detailResponse.data.data.partyList as party[],
          partyLogList: detailResponse.data.data.completedPartyList as partyLog[],
        };
      }
      return undefined;
    })
  );
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
  const validData = gameData.filter((_) => _ !== undefined).map((__) => convertToClientGame(__.game));
  return [totalItems, appIds, validData];
}

export default async function GameList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const selectedGameName = ((await searchParams).name as string) ?? undefined;
  const macSupported = ((await searchParams).mac as string) ?? undefined;
  const releaseDateStr = ((await searchParams).releaseDate as string) ?? undefined;
  const playerType = ((await searchParams).playerType as string) ?? undefined;
  const releaseStatus = ((await searchParams).releaseStatus as string) ?? undefined;
  const genre = ((await searchParams).genre as string) ?? undefined;
  const _playerType = playerType ? playerType.split(',') : [];
  const _releaseStatus = releaseStatus ? releaseStatus.split(',') : [];
  const _genre = genre ? genre.split(',') : [];

  const page = ((await searchParams).page as string) ?? undefined;

  const step = {
    keyword: selectedGameName,
    isMacSupported: macSupported,
    releaseDate: releaseDateStr,
    playerType: playerType,
    releaseStatus: releaseStatus,
    genres: _genre.map((_) => typeConverter('GameGenreTags', 'KoToEn', _)),
  };
  const pagination = {
    page: Number(page) || 1,
    size: 12,
    sort: [],
  };
  const [totalItems, appIds, validData] = await fetchGameScreenshots(step, pagination);

  const PickCardSkeletons = () => {
    return (
      <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px] mb-[100px]">
        {Array.from({ length: 12 }).map((_, ind) => (
          <Skeleton className="w-full aspect-square rounded-full" key={`Skeleton_Games_${ind}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <section className="w-full h-[520px]">
        <HeroSwiperBanner data={imageList} />
      </section>
      <div
        className="relative rounded-3xl w-[1000px] h-[400px] mt-[-300px] z-10 border border-neutral-300"
        style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.75)' }}
      >
        <p className="text-white absolute right-0 translate-y-[-100%] text-3xl font-extrabold -mt-2">
          찾으시는 게임이 있으신가요?
        </p>
        <div className="flex flex-col pt-8 px-12 pb-10">
          <div className="flex flex-col flex-auto gap-2 ">
            <p className="font-bold">게임 이름</p>
            <div className="flex items-center">
              <div className="flex flex-auto items-center rounded-lg bg-white gap-2">
                <CustomGameSearch placeholder={selectedGameName} />
              </div>
              <CustomResetComponent />
              <div className="flex items-center gap-2 ml-5">
                <CustomMacSwitch value={macSupported ? true : false} />
                <p>맥OS 지원</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시일 (선택일 이후)`}</p>
              <CustomDateTimePicker init={undefined} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`출시 상태`}</p>
              <CustomReleaseStatus
                releaseStatus={
                  releaseStatus
                    ? releaseStatuses.map((_) => _releaseStatus.includes(_))
                    : releaseStatuses.map(() => false)
                }
              />
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`플레이어`}</p>
              <CustomPlayerType
                playerType={playerType ? playerTypes.map((_) => _playerType.includes(_)) : playerTypes.map(() => false)}
              />
            </div>
          </div>
          <div className="flex gap-8 mt-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold">{`인기 장르`}</p>
              <CustomGenres
                genre={genre ? [false, ...genres.map((_) => _genre.includes(_))] : [true, ...genres.map(() => false)]}
              />
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<PickCardSkeletons />}>
        {validData && validData.length > 0 && (
          <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
            {validData.map((e, ind) => (
              <PickCard data={e} key={ind} appid={appIds[ind]} />
            ))}
          </div>
        )}
        {validData && validData.length <= 0 && (
          <div className="w-full text-center mt-[100px] mb-[100px]">
            <EmptyLottie className="w-[400px]" text="원하는 게임이 없으신가요?">
              <ImFeelingLuckyBtn />
            </EmptyLottie>
          </div>
        )}
        {validData && validData.length > 0 && (
          <div className="mt-[100px] mb-[100px]">
            <CustomPagination pageSize={12} totalItems={totalItems} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
