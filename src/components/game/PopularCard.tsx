import { gameSimple } from "@/types/games";

interface PopularCardProps {
  data: gameSimple;
};


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