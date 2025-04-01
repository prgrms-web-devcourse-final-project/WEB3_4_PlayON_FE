import { game } from "@/types/game";

export default function PopularCard(props: game) {

  return (
    <>
      <div>
        {/* <img src="test.png" className="w-[411px] h-[192.1px] rounded-xl" /> */}
        <div className="bg-neutral-400 w-full aspect-[16/7] rounded-xl"></div>
        <p className="mt-4 font-suit text-xl font-semibold"> {props.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {props.genre}</p>
      </div>
    </>
  ); 
}