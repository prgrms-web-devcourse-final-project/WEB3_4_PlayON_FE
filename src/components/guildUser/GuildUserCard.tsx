import { Avatar } from "@/components/ui/avatar";
import { guildUser } from "@/types/guildUser";

export default function GuildUserCard(props: guildUser) {

  return (
    <>
      <div className="box-content w-full rounded-lg border border-neutral-300 px-6 py-8">
        <div className="flex">
          <Avatar className="bg-neutral-400 aspect-square" />
          <div className="ml-5">
            <p className="font-suit text-sm font-normal text-neutral-500">{props.userTitle}</p>
            <p className="font-suit text-xl font-medium">{props.name}</p>
              <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {props.guildJoinDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}