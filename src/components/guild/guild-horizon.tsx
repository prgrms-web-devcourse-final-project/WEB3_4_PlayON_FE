import guild from "@/types/guild";
import { UsersIcon } from "lucide-react";

type GuildHorizonProps = {
  data: guild;
  className?: string;
};

export default function GuildHorizon(props: GuildHorizonProps) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-neutral-200 ` + props.className}>
      <img src={props.data.image} alt="loading" className="w-full object-cover aspect-[16/9]" />
      <div className="p-5 gap-1">
        <p className="font-suit text-2xl font-bold pb-2">{props.data.name}</p>
        <p className="font-suit text-base font-medium text-nowrap text-ellipsis overflow-hidden">{props.data.description}</p>
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
