import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guildUser } from '@/types/guild';
import { useMemo } from 'react';

type PickedUser = Pick<guildUser['user'], 'img_src' | 'username' | 'last_login_at'>;

type guildUserProps = Pick<guildUser, 'joined_at' | 'num_guild_posts'> & {
  user: PickedUser;
  index: number;
  total: number;
};


export default function GuildUser(props: guildUserProps) {

  const { index, total } = props;
  const joindDate = new Date(props.joined_at).toLocaleDateString("ko-kr", {
    year: "numeric",
    month: "long",
    day : "numeric"
  });
  
  const lastDate = new Date(props.user.last_login_at).toLocaleDateString("ko-kr", {
    year:"numeric",
    month: "long",
    day: "numeric"
  });
  const isList = useMemo(() => index === total - 1, [index, total]);

  return (
    <>
      <div className="flex gap-6 py-8">
        <Avatar className="bg-neutral-400 w-16 h-16">
          <AvatarImage src={props.user.img_src} />
        </Avatar>

        <div className="w-full">
          <p className="font-suit text-2xl font-bold">{props.user.username}</p>

          <div className="flex gap-5">
            <div className="flex">
              <p className="font-suit text-base font-medium">길드 가입일 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{joindDate}</p>
            </div>

            <div className="flex">
              <p className="font-suit text-base font-medium">마지막 접속 일자 : </p> &nbsp;
              <p className="font-suit text-base font-medium text-neutral-500">{lastDate}</p>
            </div>
          </div>

          <p className="font-suit text-base font-medium">전체 글 갯수 : {props.num_guild_posts}개</p>
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