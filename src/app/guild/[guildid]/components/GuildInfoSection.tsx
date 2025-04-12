'use client';

import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import GhostSVG from '@/components/svg/ghost_fill';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/routes';
import { guild } from '@/types/guild';
import { ClipboardPenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GuildInfoSection({ guildData }: { guildData: guild }) {
  const router = useRouter();
  const getTagList = (data: guild) => {
    return [...data.friendly, ...data.gender, ...data.play_style, ...data.skill_level];
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
              {getTagList(guildData).map((e, ind) => (
                <Tag style="retro" size="small" background="dark" className="" key={ind}>
                  {e}
                </Tag>
              ))}
            </div>
            <p className="text-sm text-neutral-900 font-medium line-clamp-4 text-ellipsis">{guildData.description}</p>
            <div className="flex gap-6">
              <div className="w-36 py-5 bg-neutral-100 rounded-lg aspect-square flex flex-col items-center justify-start gap-2">
                <p className="font-semibold">CAPTAIN</p>
                {guildData.owner.img_src ? (
                  <img src={guildData.owner.img_src} alt="" className="w-12 rounded-full object-cover" />
                ) : (
                  <div className="bg-purple-300 size-12 rounded-full flex justify-center items-center">
                    <GhostSVG width={24} fill="#FFFFFF" stroke="" />
                  </div>
                )}
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
            {guildData.myRole === 'GUEST' ? (
              <RetroButton type="purple" className="w-60">
                길드 참여
              </RetroButton>
            ) : (
              <RetroButton type="purple" className="w-60">
                길드 탈퇴
              </RetroButton>
            )}
          </div>
        </div>
      )}
    </>
  );
}
