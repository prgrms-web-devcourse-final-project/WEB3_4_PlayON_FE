import { Avatar } from "@/components/ui/avatar";
import { guildUser } from "@/types/guildUser";

type guildUserCardProps = {
  data: guildUser;
  // avatarClassName: string;
}

export default function GuildUserCard({data}: guildUserCardProps) {
// export default function GuildUserCard({data, avatarClassName="w-full"}: guildUserCardProps) {
  return (
    <>
      <div className="box-content rounded-lg border border-neutral-300 px-6 py-8">
        <div className="flex gap-5">
          <Avatar className="bg-neutral-400 w-16 h-16" />
          <div className="">
            {data.userTitle && <p className="font-suit text-sm font-normal text-neutral-500">{data.userTitle}</p>}
            <p className="font-suit text-xl font-medium">{data.name}</p>
            {data.guildJoinDate && (
              <p className="font-suit text-sm font-normal text-neutral-500">가입일 : {data.guildJoinDate}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}