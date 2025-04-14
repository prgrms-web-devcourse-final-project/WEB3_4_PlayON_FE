'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import GuildInfoSection from './components/GuildInfoSection';
import GuildInfoSectionSkeleton from './components/GuildInfoSectionSkeleton';
import GuildBoardLatestSection from './components/GuildBoardLatestSection';
import GuildMemberSection from './components/GuildMemberSection';
import GuildBoardNoticeSection from './components/GuildBoardNoticeSection';
import { useQuery } from '@tanstack/react-query';
import { useGuild } from '@/api/guild';
import SectionBanner from '@/components/common/SectionBanner';
import GuildBoardNoticeSectionSkeleton from './components/GuildBoardNoticeSectionSkeleton';
import GuildBoardLatestSectionSkeleton from './components/GuildBoardLatestSectionSkeleton';
import GuildMemberSectionSkeleton from './components/GuildMemberSectionSkeleton';
import { useAuthStore } from '@/stores/authStore';
import { PATH } from '@/constants/routes';
import { useAlertStore } from '@/stores/alertStore';

export default function GuildDetails() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showAlert } = useAlertStore();

  const params = useParams();
  const guildId = params.guildid as string;

  const Guild = useGuild();

  const [isNotGuest, setIsNotGuest] = useState<boolean>(false);

  const { data: guildData } = useQuery({
    queryKey: ['GuildDetail', guildId],
    queryFn: () => Guild.GetGuild(guildId),
    enabled: user !== undefined,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (guildData) {
      setIsNotGuest(!['GUEST', 'APPLICANT'].includes(guildData.myRole));
      console.log(guildData);
    }
  }, [guildData]);

  useEffect(() => {
    if (user) return;
    showAlert(
      '로그인 후 길드를 구경할 수 있습니다.',
      '로그인 페이지로 갈까요?',
      () => {
        router.push(PATH.login);
      },
      () => {
        router.back();
      }
    );
  }, []);
  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      <Suspense fallback={<GuildInfoSectionSkeleton />}>{guildData && <GuildInfoSection guildId={guildId} />}</Suspense>

      <PlayOnRollingBanner direction="right" duration={20} />

      {isNotGuest && (
        <Suspense fallback={<GuildBoardNoticeSectionSkeleton />}>
          <GuildBoardNoticeSection guildId={guildId} />
        </Suspense>
      )}
      {user && (
        <Suspense fallback={<GuildMemberSectionSkeleton />}>
          <GuildMemberSection guildId={guildId} />
        </Suspense>
      )}

      {isNotGuest && (
        <Suspense fallback={<GuildBoardLatestSectionSkeleton />}>
          <GuildBoardLatestSection guildId={guildId} />
        </Suspense>
      )}

      {guildData && !isNotGuest && (
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
