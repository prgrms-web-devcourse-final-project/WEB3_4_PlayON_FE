import { game } from "@/types/game";

export default function PickCard(props: game) {
  return (
    <>
      <div>
        {/* <img src="test.png" className="w-[302px] h-[302px] rounded-full" /> */}
        <div className="bg-neutral-400 w-full aspect-square  rounded-full"></div>
        <p className="mt-4 font-suit text-xl font-semibold"> {props.title}</p>
        <p className="mt-2 text-sm text-neutral-400 font-medium"> {props.genre}</p>
      </div>

    </>
  );
}
