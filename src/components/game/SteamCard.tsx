import { game } from "@/types/game";

type SteamCardProps = {
  data: game;
}


export default function SteamCard(props: SteamCardProps) {
  const { data } = props;

  return (
    <>
      <div>
        <img src={data.image} className="w-full aspect-square rounded-xl object-cover"/>
        {/* <div className="bg-neutral-400 w-full aspect-square rounded-xl"></div> */}
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {data.genre}</p>
      </div>
    </>
  );
}
