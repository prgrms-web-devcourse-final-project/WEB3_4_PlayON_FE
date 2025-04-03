import { game } from "@/types/game";

type PickCardProps = {
  data: game;
}

export default function PickCard(props: PickCardProps) {
  const {data} = props;

  return (
    <>
      <div>
        {/* <div className="bg-neutral-400 w-full aspect-square  rounded-full"></div> */}
        <img src={data.image} className="bg-neutral-400 w-full aspect-square rounded-full object-cover"/>
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {data.genre}</p>
      </div>
    </>
  );
}
