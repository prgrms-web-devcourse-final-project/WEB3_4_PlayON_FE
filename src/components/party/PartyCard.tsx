import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Tag from '@/components/common/Tag';
import { Skeleton } from '@/components/ui/skeleton';
import formatDate from '@/utils/formatDate';
import { getMainPendingPartyRes } from '@/types/party';
import { getSteamImage } from '@/api/steamImg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PATH } from '@/constants/routes';

interface PartyCardProps {
  data: getMainPendingPartyRes;
}

export function PartyCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-5 border-2 border-neutral-300 rounded-xl aspect-[113/100]">
      <Skeleton className="aspect-[366/160] rounded-xl" />
      <div className="flex gap-2">
        <Skeleton className="h-6 rounded-sm w-1/6" />
        <Skeleton className="h-6 rounded-sm w-1/6" />
      </div>
      <Skeleton className="h-8 rounded-sm w-1/2" />
      <Skeleton className="h-6 rounded-sm" />
      <div className="flex justify-between py-2">
        <div className="flex gap-1">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-5 w-10 rounded-sm" />
      </div>
    </div>
  );
}

export default function PartyCard({ data }: PartyCardProps) {
  const open_position = data.maximum - data.total;
  const remainingHours = getRemainingHours(new Date(data.partyAt));
  const [bg, setBg] = useState('');
  useEffect(() => {
    const fetchBg = async () => {
      const res = await getSteamImage(data.appId, 'header');
      setBg(res);
    };
    fetchBg();
  }, []);

  return (
    <Link
      href={PATH.party_detail(data.partyId)}
      className="flex flex-col gap-2 p-5 rounded-xl bg-white border-2 border-neutral-300 cursor-pointer w-full aspect-[113/100]"
    >
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="flex flex-col aspect-[366/160] rounded-xl overflow-hidden justify-between group bg-cover bg-center"
      >
        <div className="flex gap-2 ml-4 mt-4">
          {remainingHours >= 3 ? (
            <Tag style="time">{formatDate(data.partyAt)}</Tag>
          ) : (
            <Tag style="time" background="red">
              {formatDate(data.partyAt)}
            </Tag>
          )}
          {open_position === 1 && <Tag background="red">마감임박</Tag>}
          {open_position < 1 && <Tag background="red">마감</Tag>}
        </div>
        <div className="flex opacity-0 bg-gradient-to-t from-neutral-900/70 to-neutral-900/0 p-4 h-28 translate-y-4 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 justify-end items-end">
          <p className="font-suit text-4xl font-bold text-end text-white max-w-full truncate">{data.gameName}</p>
        </div>
      </div>
      <div className="flex gap-2 py-2">
        {data.partyTags?.map((tag, idx) => {
          return (
            <Tag background="medium" key={data.partyId + '_tag_' + idx}>
              {tag.tagValue}
            </Tag>
          );
        })}
      </div>
      <div className="flex flex-col gap-1 content-start">
        <div className="font-suit text-2xl font-semibold text-neutral-900 truncate">{data.name}</div>
        <p className="font-suit text-base text-neutral-900 truncate">{data.description}</p>
      </div>
      <div className="flex py-2 justify-between">
        <div className="flex gap-1 items-center">
          {data.members?.map((member, idx) =>
            idx < 4 ? (
              <Avatar key={member.memberId + data.partyId} className="bg-cover bg-center w-6 h-6 overflow-hidden">
                <AvatarImage src={member.profileImg || '/img/dummy_profile.jpg'} className="bg-cover object-cover" />
              </Avatar>
            ) : null
          )}
          {data.members?.length - 4 >= 1 && (
            <div className="font-suit text-xs text-neutral-500">+{data.members.length - 4}</div>
          )}
        </div>
        <div className="font-suit text-sm text-neutral-500">
          {data.members?.length}명 / {data.maximum}명
        </div>
      </div>
    </Link>
  );
}

// 현재시간으로부터 몇 시간 남았는지 구하는 함수
function getRemainingHours(targetDate: Date) {
  const currentTime = new Date().getTime();
  const targetTime = targetDate.getTime();
  const timeDifference = targetTime - currentTime;
  return timeDifference / (1000 * 60 * 60);
}
