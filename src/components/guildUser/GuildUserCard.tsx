import { Avatar } from "@/components/ui/avatar";
import { guildUser } from "@/types/guildUser";

export default function GuildUserCard(props: guildUser) {

  return (
    <>
      <div className="box-content w-[363px] h-[66px] rounded-lg border border-neutral-300 px-[24px] py-[32px]">
        <div className="flex">
          <Avatar className="w-[60px] h-[60px] bg-neutral-400" />
          <div className="ml-5">
            <p className="font-suit text-[14px] leading-[17px] font-normal text-neutral-500">{props.userTitle}</p>
            <p className="font-suit text-[20px] leading-[28px] font-medium">{props.name}</p>
              <p className="font-suit text-[14px] leading-[17px] font-normal text-neutral-500">가입일 : {props.guildJoinDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}