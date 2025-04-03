'use client';

import Tag from '../common/Tag';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import formatDate from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import { partyLog } from '@/types/party';

interface PartyCardProps {
  data: partyLog;
}

export function PartyLogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5 w-[410px] border-[1px] border-neutral-300 rounded-xl">
      <Skeleton className="h-[160px] rounded-xl" />
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
    router.push('/');
  };
  return (
    <div className="flex flex-col gap-4 p-5 w-[410px] rounded-xl bg-white border-[1px] border-neutral-300 cursor-pointer">
      <div
        style={{
          backgroundImage: `url(${data.party_info.selected_game.img_src})`,
        }}
        className="flex flex-col h-[160px] rounded-xl overflow-hidden justify-between group bg-cover bg-center"
      ></div>
      <div className="flex flex-col gap-1">
        <div className="font-suit text-2xl font-semibold line-clamp-1 text-neutral-900">
          {data.party_info.party_name}
        </div>
        <div className="flex justify-between items-center">
          <Tag style="time" className="px-0">
            {formatDate(data.party_info.start_time)}
          </Tag>
          <div className="font-suit text-sm text-neutral-500">전체 {data.party_info.participation.length}명</div>
        </div>
        <div className="flex gap-2 py-2">
          {data.party_info.tags.map((tag) => (
            <Tag background="medium" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <Button className="text-lg h-10" onClick={handleClick}>
        파티 로그 확인
      </Button>
    </div>
  );
}
