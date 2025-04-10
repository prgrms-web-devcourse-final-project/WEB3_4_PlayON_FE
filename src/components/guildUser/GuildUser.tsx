'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guildUser } from '@/types/guild';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

interface guildUserProps {
  data: guildUser;
  index: number;
  total: number;
}

export default function GuildUser(props: guildUserProps) {
  const { data, index, total } = props;
  const joindDate = data.joined_at
    ? new Date(data.joined_at).toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
    : '정보 없음';

  const lastDate = data.user.last_login_at
    ? new Date(data.user.last_login_at).toLocaleDateString('ko-kr', { year: 'numeric', month: 'long', day: 'numeric' })
    : '정보 없음';
  const isList = useMemo(() => index === total - 1, [index, total]);

    const params = useParams();
  const guildid = params?.guildid as string;
  
    const handleToggleManager = async () => {
      try {
        const url = `/api/guilds/${guildId}/managers`;
        if (data.user.is_manager) {
          // 매니저 회수
          await axios.delete(url, { data: { userId: data.user.id } });
          alert('매니저 권한이 회수되었습니다.');
        } else {
          // 매니저 임명
          await axios.put(url, { userId: data.user.id });
          alert('매니저로 임명되었습니다.');
        }
      } catch (error) {
        console.error('매니저 권한 변경 실패:', error);
        alert('권한 변경 실패');
      }
    };

    const handleKickMember = async () => {
      try {
        const url = `/api/guilds/${guildId}/members`;
        await axios.delete(url, { data: { userId: data.user.id } });
        alert('해당 멤버가 퇴출되었습니다.');
      } catch (error) {
        console.error('멤버 퇴출 실패:', error);
        alert('퇴출 실패');
      }
    };

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
          <div className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit">권한변경</div>
          <div className="font-suit text-base font-medium whitespace-nowrap flex-shrink-0 min-w-fit">퇴출</div>
        </div>
      </div>

      {!isList && <div className="border-b border-neutral-200"></div>}
    </>
  );
}
