'use client';
import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostLong from '@/components/community/post-long';
import { PATH } from '@/constants/routes';
import { postSimple } from '@/types/community';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GuildBoardNoticeSection({
  guildId,
  guildBoardNotice,
}: {
  guildId: string;
  guildBoardNotice: postSimple[];
}) {
  const router = useRouter();
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
        {guildBoardNotice && guildBoardNotice[0] && (
          <CommunityPostImageLong
            data={guildBoardNotice[0]}
            className="h-44 "
            onClick={() => {
              router.push(PATH.guild_community_detail(guildId, String(guildBoardNotice[0].postId)));
            }}
          />
        )}
        {guildBoardNotice && guildBoardNotice[1] && (
          <CommunityPostLong
            data={guildBoardNotice[1]}
            className="h-44"
            onClick={() => {
              router.push(PATH.guild_community_detail(guildId, String(guildBoardNotice[1].postId)));
            }}
          />
        )}
      </div>
    </div>
  );
}
