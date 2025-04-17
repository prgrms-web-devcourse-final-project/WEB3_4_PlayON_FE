import { GAME_ROUTE } from '@/constants/routes/game';
import { gameDetail } from '@/types/games';
import Link from 'next/link';

interface PickCardProps {
  data: gameDetail;
  appid: number;
}

export default function PickCard(props: PickCardProps) {
  const { data } = props;

  return (
    <>
      <Link href={GAME_ROUTE.game_detail(props.appid)}>
        {/* <div className="bg-neutral-400 w-full aspect-square  rounded-full"></div> */}
        <img src={data.screenshot_src[0]} className="bg-neutral-400 w-full aspect-square rounded-full object-cover" />
        <div className="pr-2">
          <p className="mt-4 font-suit text-xl font-semibold text-ellipsis overflow-hidden">{data.title}</p>
          <p className="mt-2 text-sm text-neutral-400 font-medium flex text-ellipsis overflow-hidden">
            {data.genre.join(', ')}
          </p>
        </div>
      </Link>
    </>
  );
}
