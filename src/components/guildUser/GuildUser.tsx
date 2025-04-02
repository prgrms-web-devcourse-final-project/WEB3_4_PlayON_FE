import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guildUser } from '@/types/guildUser';
import { useMemo } from 'react';

type guildUserProps = {
  data: guildUser;
  lastDate: string;
  postNum: number;
  index: number;
  total: number;
  // avatarClassName?: string;
};

export default function GuildUser(props: guildUserProps) {

  const { data, lastDate, postNum, index, total } = props;
  const isList = useMemo(() => index === total - 1, [index, total]);

  return (
    <>
      <div className="flex gap-6 py-8">
        <Avatar className="bg-neutral-400 w-16 h-16">
          <AvatarImage src={data.image} />
        </Avatar>

        <div className="w-full">
          <p className="font-suit text-2xl font-bold">{data.name}</p>

          <div className="flex gap-5">
            <div className="flex">
              <p className="font-suit text-base font-medium">길드 가입일 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{data.guildJoinDate}</p>
            </div>

            <div className="flex">
              <p className="font-suit text-base font-medium">마지막 접속 일자 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{lastDate}</p>
            </div>
          </div>

          <p className="font-suit text-base font-medium">전체 글 갯수 : {postNum}개</p>
        </div>

        <div className="flex gap-3">
          <div className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit">권한변경</div>
          <div className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit">퇴출</div>
        </div>
      </div>

      {!isList && <div className="border-b border-neutral-200"></div>}
    </>
  );
}