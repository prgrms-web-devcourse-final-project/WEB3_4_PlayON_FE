import { gameSimple } from '@/types/games';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { PATH } from '@/constants/routes';
import { GAME_ROUTE } from '@/constants/routes/game';

interface PopularCardProps {
  data: {
    title: string;
    genre: string[];
    img_src: string;
    background_src: string;
    appid: number;
  };
}

export function PopularCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full aspect-[16/7] rounded-xl bg-neutral-400 object-cover" />
      <Skeleton className="mt-4 font-suit text-xl font-semibold" />
      <Skeleton className="mt-2 text-sm text-neutral-400 font-medium" />
    </div>
  );
}

export default function PopularCard(props: PopularCardProps) {
  const { data } = props;

  return (
    <>
      <Link href={PATH.game_detail(data?.appid)}>
        <div>
          <img src={data?.img_src} className="w-full aspect-[16/7] rounded-xl bg-neutral-400 object-cover" />
          <p className="mt-4 font-suit text-xl font-semibold"> {data?.title}</p>
          <p className="mt-2 text-sm text-neutral-400 font-medium"> {data?.genre.join(', ')}</p>
        </div>
      </Link>
    </>
  );
}
