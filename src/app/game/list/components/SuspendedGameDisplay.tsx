'use client';

import { gameDetail } from '@/types/games';
import CustomPagination from '@/components/common/CustomPagination';
import EmptyLottie from '@/components/common/EmptyLottie';
import PickCard from '@/components/game/PickCard';
import ImFeelingLuckyBtn from './ImFeelingLuckyBtn';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGames } from '../getGames';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function SuspendedGameDisplay(props: { step: Step; pagination: Pagination }) {
  const [totalItems, setTotalItems] = useState(48);
  const [appIds, setAppIds] = useState<number[]>([]);
  const [validData, setValidData] = useState<gameDetail[]>();

  const { data, isFetched, isFetching } = useQuery({
    queryKey: ['games', props.step, props.pagination],
    queryFn: async () => getGames(props.step, props.pagination),
  });
  useEffect(() => {
    if (data) {
      setTotalItems(data.totalItems);
      setAppIds(data.appIds);
      setValidData(data.games);
    }
  }, [data]);

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
    <>
      {isFetching && <PickCardSkeletons />}
      {isFetched && validData && validData.length > 0 && (
        <div className="lg:w-[1280px] grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-12 mt-[100px]">
          {validData.map((e, ind) => (
            <PickCard data={e} key={ind} appid={appIds[ind]} />
          ))}
        </div>
      )}
      {isFetched && validData && validData.length <= 0 && (
        <div className="w-full text-center mt-[100px] mb-[100px]">
          <EmptyLottie className="w-[400px]" text="원하는 게임이 없으신가요?">
            <ImFeelingLuckyBtn />
          </EmptyLottie>
        </div>
      )}
      {isFetched && validData && validData.length > 0 && (
        <div className="mt-[100px] mb-[100px]">
          <CustomPagination pageSize={12} totalItems={totalItems} />
        </div>
      )}
    </>
  );
}
