import { gameSimple } from '@/types/games';
import { Skeleton } from '../ui/skeleton';

interface PopularCardProps {
  data: gameSimple;
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
      <div>
        <img src={data.img_src} className="w-full aspect-[16/7] rounded-xl bg-neutral-400 object-cover" />
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {data.genre.join(', ')}</p>
      </div>
    </>
  );
}
