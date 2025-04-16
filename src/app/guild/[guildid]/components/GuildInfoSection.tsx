'use client';

import { useGuild } from '@/api/guild';
import { useGuildJoin } from '@/api/guildJoin';
import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { guild } from '@/types/guild';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { ClipboardPenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import styles from './guildInfo.module.css';
import { useGuildsMembers } from '@/api/guild-member';

export default function GuildInfoSection({ guildId }: { guildId: string }) {
  const router = useRouter();
  const Guild = useGuild();
  const guildJoin = useGuildJoin();
  const guildMembers = useGuildsMembers();
  const Toast = useToast();
  const getTagList = (data: guild) => {
    return [...data.friendly, ...data.gender, ...data.play_style, ...data.skill_level];
  };
  const queryClient = useQueryClient();

  const { data: guildData } = useSuspenseQuery({
    queryKey: ['GuildDetailInside', guildId],
    queryFn: () => Guild.GetGuild(guildId),
  });

  const requestGuildJoin = useCallback(async () => {
    const response = await guildJoin.RequestGuildJoin(Number(guildId));
    if (response) {
      Toast.toast({
        title: '길드 가입 요청을 보냈습니다.',
        variant: 'primary',
      });
    } else {
      Toast.toast({
        title: '길드 가입 요청에 실패했습니다.',
      });
    }
    queryClient.refetchQueries({ queryKey: ['GuildDetailInside', guildId], exact: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaveGuild = useCallback(async () => {
    if (guildData && guildData.myRole === 'LEADER') {
      Toast.toast({
        title: '방장은 탈퇴할 수 없습니다.',
        variant: 'destructive',
      });
      return;
    }
    const response = await guildMembers.LeaveMembers(guildId);
    console.log(response);
    Toast.toast({
      title: '길드를 탈퇴했습니다.',
      variant: 'primary',
    });
    queryClient.refetchQueries({ queryKey: ['GuildDetail', guildId], exact: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GuildActionButton = () => {
    if (guildData === false) return;
    if (guildData.max_members > guildData.num_members) {
      if (guildData.myRole === 'GUEST') {
        return (
          <RetroButton type="purple" className="w-60" callback={requestGuildJoin}>
            길드 참여
          </RetroButton>
        );
      } else if (guildData.myRole === 'APPLICANT') {
        return (
          <RetroButton type="purple" className="w-60">
            <div className="flex items-center gap-1">
              <div className={`${styles.spinner}`}></div>승인 대기
            </div>
          </RetroButton>
        );
      } else {
        return (
          <RetroButton type="purple" className="w-60" callback={leaveGuild}>
            길드 탈퇴
          </RetroButton>
        );
      }
    } else {
      if (guildData.myRole === 'GUEST' || guildData.myRole === 'APPLICANT') {
        return (
          <RetroButton type="grey" className="w-60">
            인원 마감
          </RetroButton>
        );
      } else {
        return (
          <RetroButton type="purple" className="w-60" callback={leaveGuild}>
            길드 탈퇴
          </RetroButton>
        );
      }
    }
  };

  return (
    <>
      {guildData && (
        <div className="flex gap-6 w-[67%] self-center">
          <div className="flex flex-col gap-4 min-w-[628px] aspect-[16/7]">
            <div
              style={{ backgroundImage: `url(${guildData.img_src})` }}
              className=" size-full rounded-3xl bg-center bg-cover"
            />
            {(guildData.myRole === 'LEADER' || guildData.myRole === 'MANAGER') && (
              <Button
                variant="outline"
                className="w-fit px-4 py-2 text-neutral-500"
                onClick={() => router.push(PATH.guild_admin(String(guildData.guild_id)))}
              >
                <ClipboardPenIcon />
                <span>길드 관리</span>
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-5xl text-neutral-900">{guildData.guild_name}</p>
            <div className="flex gap-2">
              {getTagList(guildData)
                .slice(0, 8)
                .map((e, ind) => (
                  <Tag style="retro" size="small" background="dark" className="" key={ind}>
                    {e}
                  </Tag>
                ))}
            </div>
            <p className="text-sm text-neutral-900 font-medium line-clamp-4 text-ellipsis">{guildData.description}</p>
            <div className="flex gap-6">
              <div className="w-36 py-5 bg-neutral-100 rounded-lg aspect-square flex flex-col items-center justify-start gap-2">
                <p className="font-semibold">CAPTAIN</p>
                <img
                  src={guildData.owner.img_src || '/img/dummy_profile.jpg'}
                  alt=""
                  className="size-12 rounded-full object-cover"
                />
                <p>{guildData.owner.nickname}</p>
              </div>
              <div className="w-36 py-5 bg-neutral-100 rounded-lg aspect-square flex flex-col items-center justify-start gap-5">
                <p className="font-semibold">MEMBERS</p>
                <p>
                  <span className="text-4xl font-extrabold">{`${guildData.num_members}`}</span>
                  <span>{`/ ${guildData.max_members}`}</span>
                </p>
              </div>
            </div>
            <GuildActionButton />
          </div>
        </div>
      )}
    </>
  );
}
