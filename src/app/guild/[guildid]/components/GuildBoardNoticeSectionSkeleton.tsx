import { CommunityPostImageLongSkeleton } from '@/components/community/post-image-long';
import { ChevronRight } from 'lucide-react';

export default function GuildBoardNoticeSectionSkeleton() {
  return (
    <div className="flex flex-col w-[67%] self-center">
      <div className="flex w-full justify-between">
        <p className="text-4xl font-bold text-neutral-900">공지</p>
        <div className="flex items-center">
          <p className="text-xl font-medium text-neutral-900">전체 보기</p>
          <ChevronRight />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-neutral-200">
        <CommunityPostImageLongSkeleton className="h-44 " />
      </div>
    </div>
  );
}
