'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import GuildInfoSection from './components/GuildInfoSection';
import GuildInfoSectionSkeleton from './components/GuildInfoSectionSkeleton';
import GuildBoardLatestSection from './components/GuildBoardLatestSection';
import GuildMemberSection from './components/GuildMemberSection';
import GuildBoardNoticeSection from './components/GuildBoardNoticeSection';

export default function GuildDetails() {
  const params = useParams();
  const guildId = params.guildid as string;

  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      <Suspense fallback={<GuildInfoSectionSkeleton />}>
        <GuildInfoSection guildId={guildId} />
      </Suspense>

      <PlayOnRollingBanner direction="right" duration={20} />
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        <GuildBoardNoticeSection guildId={guildId} />
      </Suspense>
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        <GuildMemberSection guildId={guildId} />
      </Suspense>
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        <GuildBoardLatestSection guildId={guildId} />
      </Suspense>
    </div>
  );
}
