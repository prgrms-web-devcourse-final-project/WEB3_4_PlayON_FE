import { Avatar } from "@/components/ui/avatar";
import { guildUser } from "@/types/guildUser";

type guildUserProps = {
  data: guildUser;
  lastDate: string;
  postNum: number;
}

export default function GuildUser(props: guildUserProps) {

  return (
    <>
      <div className="flex gap-6 py-8">
        <Avatar className="bg-neutral-400 aspect-square" />

        <div className="w-full">
          <p className="font-suit text-2xl font-bold">{props.data.name}</p>

          <div className="flex gap-5">
            <div className="flex">
              <p className="font-suit text-base font-medium">길드 가입일 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{props.data.guildJoinDate}</p>
            </div>

            <div className="flex">
              <p className="font-suit text-base font-medium">마지막 접속 일자 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{props.lastDate}</p>
            </div>
          </div>

            <p className="font-suit text-base font-medium">전체 글 갯수 : {props.postNum}개</p>
        </div>

        <div className="flex gap-3">
          <div className="font-suit text-base font-medium">권한변경</div>
          <div className="font-suit text-base font-medium">퇴출</div>
        </div>
        
      </div>
      <div className="border-b border-neutral-200"></div> 
    </>
  );
}