'use client';

import Tag from '../common/Tag';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import { getPartyRes } from '@/types/party';
import { useEffect, useState } from 'react';
import { getSteamImage } from '@/api/steamImg';
import { PATH } from '@/constants/routes';

interface PartyCardProps {
  data: getPartyRes;
}

export function PartyLogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5  w-full aspect-[113/100] border-[1px] border-neutral-300 rounded-xl">
      <Skeleton className="aspect-[366/160] rounded-xl" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 rounded-sm w-1/2" />
        <div className="flex justify-between py-2">
          <Skeleton className="h-5 w-1/4 rounded-sm" />
          <Skeleton className="h-5 w-10 rounded-sm" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 rounded-sm w-1/6" />
          <Skeleton className="h-6 rounded-sm w-1/6" />
        </div>
      </div>
      <Skeleton className="w-full h-10" />
    </div>
  );
}

export default function PartyLogCard({ data }: PartyCardProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(PATH.party_log(data.partyId));
  };
  const [bg, setBg] = useState('');
  useEffect(() => {
    const fetchBg = async () => {
      const res = await getSteamImage(data.appId, 'header');
      setBg(res);
    };
    fetchBg();
  }, []);
  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl bg-white border-[1px] border-neutral-300 w-full aspect-[113/100]">
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="flex flex-col aspect-[366/160] rounded-xl overflow-hidden justify-between group bg-cover bg-center"
      ></div>
      <div className="flex flex-col gap-1">
        <div className="font-suit text-2xl font-semibold truncate text-neutral-900">{data.name}</div>
        <div className="flex justify-between items-center">
          <Tag style="time" className="px-0">
            {formatDate(data.partyAt)}
          </Tag>
          <div className="font-suit text-sm text-neutral-500">전체 {data.total}명</div>
        </div>
        <div className="flex gap-2 py-2">
          {data.partyTags?.map((tag, idx) => (
            <Tag background="medium" key={tag.tagValue + idx}>
              {tag.tagValue}
            </Tag>
          ))}
        </div>
      </div>
      <Button className="text-lg h-10 cursor-pointer hover:bg-purple-700" onClick={handleClick}>
        파티 로그 확인
      </Button>
    </div>
  );
}
