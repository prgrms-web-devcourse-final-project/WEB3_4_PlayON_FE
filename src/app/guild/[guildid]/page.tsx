'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import GuildInfoSection from './components/GuildInfoSection';
import GuildInfoSectionSkeleton from './components/GuildInfoSectionSkeleton';
import GuildBoardLatestSection from './components/GuildBoardLatestSection';
import GuildMemberSection from './components/GuildMemberSection';
import GuildBoardNoticeSection from './components/GuildBoardNoticeSection';
import { useGuildBoard } from '@/api/guildBoard';
import { useQuery } from '@tanstack/react-query';
import { useGuild } from '@/api/guild';
import SectionBanner from '@/components/common/SectionBanner';
// import { useAuthStore } from '@/stores/authStore';
// import { PATH } from '@/constants/routes';

export default function GuildDetails() {
  const router = useRouter();
  // const { user } = useAuthStore();

  // if (user === undefined) {
  //   router.push(PATH.login);
  // }

  const params = useParams();
  const guildId = params.guildid as string;

  const Guild = useGuild();
  const GuildBoard = useGuildBoard();

  const [isNotGuest, setIsNotGuest] = useState<boolean>(false);

  const { data: guildData } = useQuery({
    queryKey: ['GuildDetail', guildId],
    queryFn: () => Guild.GetGuild(guildId),
  });

  const { data: guildBoardNotice } = useQuery({
    queryKey: ['GuildBoardNotice', guildId],
    queryFn: () => GuildBoard.GuildNoticesPost(Number(guildId)),
    enabled: isNotGuest,
  });

  const { data: guildBoardLatest } = useQuery({
    queryKey: ['GuildBoardLatest', guildId],
    queryFn: () => GuildBoard.GuildLatestPost(Number(guildId)),
    enabled: isNotGuest,
  });

  useEffect(() => {
    if (guildData) {
      setIsNotGuest(guildData.myRole !== 'GUEST');
    }
  }, [guildData]);
  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      <Suspense fallback={<GuildInfoSectionSkeleton />}>
        {guildData && <GuildInfoSection guildData={guildData} />}
      </Suspense>

      <PlayOnRollingBanner direction="right" duration={20} />
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        {guildBoardNotice && <GuildBoardNoticeSection guildId={guildId} guildBoardNotice={guildBoardNotice} />}
      </Suspense>
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        <GuildMemberSection guildId={guildId} />
      </Suspense>
      <Suspense fallback={<div>데이터 불러오는 중...</div>}>
        {guildBoardLatest && <GuildBoardLatestSection guildId={guildId} guildBoardLatest={guildBoardLatest} />}
      </Suspense>
      {!isNotGuest && (
        <div className="w-[67%] self-center">
          <SectionBanner
            description="길드의 활동이 궁금하신가요?"
            highlight="지금 바로 길드에 가입하세요!"
            className="bg-purple-300"
          >
            <img src="/img/3d_object/game_pad.png" alt="icon" className="h-[180px]" />
          </SectionBanner>
        </div>
      )}
    </div>
  );
}
