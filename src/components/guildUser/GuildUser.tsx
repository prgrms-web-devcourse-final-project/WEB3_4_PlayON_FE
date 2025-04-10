'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guildUser } from '@/types/guild';
import { useMemo } from 'react';

interface guildUserProps {
  data: guildUser;
  membetId: string;
  index: number;
  total: number;
  onToggleManager: (userId: string, guild_role: string) => void;
  onKickMember: (userId: string) => void;
}

export default function GuildUser(props: guildUserProps) {
  const { data, index, total, onToggleManager, onKickMember } = props;
  const joindDate = data.joined_at
    ? new Date(data.joined_at).toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
    : '정보 없음';

  const lastDate = data.user.last_login_at
    ? new Date(data.user.last_login_at).toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
    : '정보 없음';
  const isList = useMemo(() => index === total - 1, [index, total]);

  console.log('GuildUser 렌더링 확인:', data);

  return (
    <>
      <div className="flex gap-6 py-8">
        <Avatar className="bg-neutral-400 w-16 h-16">
          <AvatarImage src={data.user.img_src || 'https://avatars.githubusercontent.com/u/124599?v=4'} />
        </Avatar>

        <div className="w-full">
          <p className="font-suit text-2xl font-bold">{data.user.nickname}</p>

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

          <p className="font-suit text-base font-medium">전체 글 갯수 : {data.num_guild_posts}개</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onToggleManager(data.user.id, data.guild_role)}
            className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit"
          >
            권한변경
          </button>
          <button
            onClick={() => onKickMember(data.user.id)}
            className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit"
          >
            퇴출
          </button>
        </div>
      </div>

      {!isList && <div className="border-b border-neutral-200"></div>}
    </>
  );
}
