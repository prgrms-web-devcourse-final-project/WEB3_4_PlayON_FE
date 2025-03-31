import guild from "@/types/guild";
import { UsersIcon } from "lucide-react";

type GuildVerticalProps = {
  data: guild;
  className?: string;
};

export default function GuildVertical(props: GuildVerticalProps) {
  return (
    <div className={`bg-white overflow-hidden flex gap-6 ` + props.className}>
      <img src={props.data.image} alt="Loading" className="rounded-2xl h-full aspect-square object-cover" />
      <div className="py-4 flex flex-col h-full justify-between">
        <div className="h-[90%] overflow-hidden">
          <p className="font-suit text-2xl font-bold pb-4">{props.data.name}</p>
          <p className="font-suit text-base font-medium text-ellipsis">{props.data.description}</p>
        </div>
        <div className="font-suit text-sm font-medium flex gap-4">
          <div className="flex gap-1">
            {props.data.guildTags.map((e, ind) => (
              <p key={ind}>#{e}</p>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon size={14} color="#737373" strokeWidth={1} />
            <p className="text-neutral-500">{props.data.numMembers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
