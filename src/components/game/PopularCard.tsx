import { game } from "@/types/game";

export default function PopularCard(props: game) {

  return (
    <>
      <div>
        {/* <img src="test.png" className="w-[411px] h-[192.1px] rounded-xl" /> */}
        <div className="bg-neutral-400 w-[411px] h-[192.1px] rounded-xl"></div>
        <p className="mt-[16px] font-suit text-xl font-semibold"> {props.title}</p>
        <p className="mt-[8px] text-sm text-neutral-400 font-medium"> {props.genre}</p>
      </div>
    </>
  ); 
}