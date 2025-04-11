'use client';
import { useGuildBoard } from '@/api/guildBoard';
import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostLong from '@/components/community/post-long';
import { PATH } from '@/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GuildBoardNoticeSection({ guildId }: { guildId: string }) {
  const guildid = Number(guildId);
  const GuildBoard = useGuildBoard();
  const router = useRouter();

  const { data: guildBoardData } = useQuery({
    queryKey: ['GuildBoardNotice', guildId],
    queryFn: () => GuildBoard.GuildNoticesPost(guildid),
  });
  return (
    <div className="flex flex-col w-[67%] self-center">
      <div className="flex w-full justify-between">
        <p className="text-4xl font-bold text-neutral-900">공지</p>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push(`${PATH.guild_community(guildId)}?tag=공지`)}
        >
          <p className="text-xl font-medium text-neutral-900">전체 보기</p>
          <ChevronRight />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-neutral-200">
        {guildBoardData && guildBoardData[0] && (
          <CommunityPostImageLong
            data={guildBoardData[0]}
            className="h-44 "
            onClick={() => {
              router.push(PATH.guild_community_detail(guildId, String(guildBoardData[0].postId)));
            }}
          />
        )}
        {guildBoardData && guildBoardData[1] && (
          <CommunityPostLong
            data={guildBoardData[1]}
            className="h-44"
            onClick={() => {
              router.push(PATH.guild_community_detail(guildId, String(guildBoardData[1].postId)));
            }}
          />
        )}
      </div>
    </div>
  );
}
