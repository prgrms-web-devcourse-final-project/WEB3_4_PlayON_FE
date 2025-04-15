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
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium flex"> {data.genre.join(', ')} </p>
      </Link>
    </>
  );
}
