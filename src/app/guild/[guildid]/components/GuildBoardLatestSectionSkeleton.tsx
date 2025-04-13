import { CommunityPostImageShortSkeleton } from '@/components/community/post-image-short';
import { ChevronRight } from 'lucide-react';

export default function GuildBoardLatestSectionSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-[67%] self-center">
      <div className="flex w-full justify-between">
        <p className="text-4xl font-bold text-neutral-900">길드 최신글</p>
        <div className="flex items-center">
          <p className="text-xl font-medium text-neutral-900">전체 보기</p>
          <ChevronRight />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        <CommunityPostImageShortSkeleton className="h-52" />
        <CommunityPostImageShortSkeleton className="h-52" />
      </div>
    </div>
  );
}
