import { gameSimple } from '@/types/games';
import { Skeleton } from '../ui/skeleton';
import { Gamepad2 } from 'lucide-react';

interface SelectedGameCardProps {
  data?: gameSimple;
}

export function SelectedGameCardSkeleton() {
  return <Skeleton className="aspect-[410/180] rounded-2xl" />;
}

export default function SelectedGameCard({ data }: SelectedGameCardProps) {
  if (!data) {
    return (
      <div className="aspect-[410/180] bg-neutral-100 rounded-2xl flex justify-center items-center">
        <div className="flex flex-col gap-2 items-center">
          <Gamepad2 size={40} strokeWidth={1.4} className="text-neutral-400" />
          <p className="text-neutral-400 text-base font-semibold">제한된 게임이 없습니다.</p>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{ backgroundImage: `url(${data.img_src})` }}
      className="aspect-[410/180] max-w-[410px] rounded-2xl overflow-hidden bg-cover bg-center group"
    >
      <div className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-black/80 to-black/10 size-full px-8 py-12 place-content-center transition-all">
        <div className="text-white font-suit text-base font-normal ">선택된 게임</div>
        <div className="text-white font-suit text-4xl font-bold truncate">{data.title}</div>
      </div>
    </div>
  );
}
