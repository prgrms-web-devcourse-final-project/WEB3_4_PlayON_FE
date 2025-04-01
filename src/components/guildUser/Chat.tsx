import { guildUser } from "@/types/guildUser";


export default function Chat(props: guildUser) {
  return (
    <>
      <div className="flex gap-[4px] ">
        <p className="font-suit text-[12px] text-neutral-400 font-normal">{props.userTitle}</p>
        <p className="font-suit text-[12px] text-sky-700 font-bold">{props.name}</p>
      </div>

        <p className="font-suit text-[16px] font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </>
  );
}

