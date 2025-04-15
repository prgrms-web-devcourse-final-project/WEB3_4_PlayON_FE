'use client';

import { useGuildBoard } from '@/api/guildBoard';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
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
        {guildBoardLatest && guildBoardLatest.length > 0 && (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push(`${PATH.guild_community(guildId)}`)}
          >
            <p className="text-xl font-medium text-neutral-900">전체 보기</p>
            <ChevronRight />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {guildBoardLatest &&
          guildBoardLatest.map((post) => {
            if (post.img_src) {
              return (
                <CommunityPostImageShort
                  key={post.postId}
                  data={post}
                  guildId={guildId}
                  className="h-52 cursor-pointer"
                />
              );
            } else {
              return (
                <CommunityPostShort key={post.postId} data={post} guildId={guildId} className="h-52 cursor-pointer" />
              );
            }
          })}
      </div>
      {guildBoardLatest && guildBoardLatest.length <= 0 && (
        <div className="flex gap-12 w-full items-center">
          <EmptyLottie noText className="w-60" text=" " />
          <div className="flex flex-col w-full -translate-y-5">
            <p className="font-dgm text-lg w-full">게시글이 없어요</p>
            <p className="font-dgm text-3xl w-full mb-5">첫 번째 게시물을 작성해보세요!</p>
            <RetroButton type="purple" className="w-72" callback={() => router.push(PATH.guild_community(guildId))}>
              글 작성하기
            </RetroButton>
          </div>
        </div>
      )}
    </div>
  );
}
