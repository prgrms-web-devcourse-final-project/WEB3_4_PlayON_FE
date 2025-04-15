'use client';
import { useGuildBoard } from '@/api/guildBoard';
import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostLong from '@/components/community/post-long';
import { PATH } from '@/constants/routes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GuildBoardNoticeSection({ guildId }: { guildId: string }) {
  const router = useRouter();
  const GuildBoard = useGuildBoard();

  const { data: guildBoardNotice } = useSuspenseQuery({
    queryKey: ['GuildBoardNotice', guildId],
    queryFn: () => GuildBoard.GuildNoticesPost(Number(guildId)),
  });

  return (
    <div className="flex flex-col w-[67%] self-center">
      {guildBoardNotice && guildBoardNotice.length > 0 && (
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
      )}
      <div className="flex flex-col divide-y divide-neutral-200">
        {guildBoardNotice &&
          guildBoardNotice.map((post) => {
            if (post.img_src) {
              return (
                <CommunityPostImageLong
                  key={post.postId}
                  data={post}
                  className="h-44 "
                  onClick={() => {
                    router.push(PATH.guild_community_detail(guildId, String(post.postId)));
                  }}
                />
              );
            } else {
              return (
                <CommunityPostLong
                  key={post.postId}
                  data={post}
                  className="h-44"
                  onClick={() => {
                    router.push(PATH.guild_community_detail(guildId, String(post.postId)));
                  }}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
