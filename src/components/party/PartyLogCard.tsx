import { Party } from '@/types/party';
import Tag from '../common/Tag';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

interface PartyCardProps {
  data: Party;
}

export function PartyLogCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-5 w-[410px] border-2 border-neutral-300 rounded-xl">
      <Skeleton className="h-[160px] rounded-xl" />
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

export default function PartyLogCard({ data }: PartyCardProps) {
  return (
    <div className="flex flex-col gap-4 p-5 w-[410px] rounded-xl bg-white border-[1px] border-neutral-300 cursor-pointer">
      <div
        style={{
          backgroundImage: `url(${data.game_image})`,
        }}
        className="flex flex-col h-[160px] rounded-xl overflow-hidden justify-between group bg-cover bg-center"
      ></div>
      <div className="flex flex-col gap-1">
        <div className="font-suit text-2xl font-semibold line-clamp-1 text-neutral-900">{data.name}</div>
        <div className="flex justify-between items-center">
          <Tag style="time" className="px-0">
            {formatDate(data.party_at)}
          </Tag>
          <div className="font-suit text-sm text-neutral-500">전체 {data.members.length}명</div>
        </div>
        <div className="flex gap-2 py-2">
          {data.party_tags.map((tag) => (
            <Tag background="medium" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <Button className="text-lg h-10">파티 로그 확인</Button>
    </div>
  );
}

// 날짜 포맷팅 함수
function formatDate(targetDate: Date) {
  return targetDate.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
