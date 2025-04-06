import { gameSimple } from "@/types/games";

interface SteamCardProps {
  data: gameSimple;
};


export default function SteamCard(props: SteamCardProps) {
  const { data } = props;

  return (
    <>
      <div>
        <img src={data.img_src} className="w-full aspect-square rounded-xl object-cover"/>
        <p className="mt-4 font-suit text-xl font-semibold"> {data.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {data.genre.join(', ')}</p>
      </div>
    </>
  );
}
