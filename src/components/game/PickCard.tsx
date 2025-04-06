import { gameDetail } from '@/types/games';

interface PickCardProps {
  data: gameDetail;
}

export default function PickCard(props: PickCardProps) {
  const { data } = props;

  return (
    <>
      <div>
        {/* <div className="bg-neutral-400 w-full aspect-square  rounded-full"></div> */}
        <img src={data.screenshot_src[0]} className="bg-neutral-400 w-full aspect-square rounded-full object-cover" />
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium flex"> {data.genre.join(', ')} </p>
      </div>
    </>
  );
}
