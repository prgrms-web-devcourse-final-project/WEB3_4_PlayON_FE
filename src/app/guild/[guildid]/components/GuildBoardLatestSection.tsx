'use client';

import { useGuildBoard } from '@/api/guildBoard';
import CommunityPostImageShort from '@/components/community/post-image-short';
import CommunityPostShort from '@/components/community/post-short';
import { PATH } from '@/constants/routes';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GuildBoardLatestSection({ guildId }: { guildId: string }) {
  const router = useRouter();
  const GuildBoard = useGuildBoard();

  const { data: guildBoardLatest } = useSuspenseQuery({
    queryKey: ['GuildBoardLatest', guildId],
    queryFn: () => GuildBoard.GuildLatestPost(Number(guildId)),
  });

  return (
    <div className="flex flex-col gap-6 w-[67%] self-center">
      <div className="flex w-full justify-between">
        <p className="text-4xl font-bold text-neutral-900">길드 최신글</p>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push(`${PATH.guild_community(guildId)}`)}
        >
          <p className="text-xl font-medium text-neutral-900">전체 보기</p>
          <ChevronRight />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {guildBoardLatest &&
          guildBoardLatest.map((post) => {
            if (post.img_src) {
              return <CommunityPostImageShort key={post.postId} data={post} className="h-52 cursor-pointer" />;
            } else {
              return <CommunityPostShort key={post.postId} data={post} className="h-52 cursor-pointer" />;
            }
          })}
      </div>
    </div>
  );
}
