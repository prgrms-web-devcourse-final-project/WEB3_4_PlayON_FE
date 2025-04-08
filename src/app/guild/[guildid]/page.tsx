'use client';

import { dummyGuild, dummyPost, dummyGuildUser } from '@/utils/dummyData';
import Tag from '@/components/common/Tag';
import { Button } from '@/components/ui/button';
import { ChevronRight, ClipboardPenIcon } from 'lucide-react';
import RetroButton from '@/components/common/RetroButton';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import CommunityPostImageLong from '@/components/community/post-image-long';
import CommunityPostLong from '@/components/community/post-long';
import CommunityPostImageShort from '@/components/community/post-image-short';
import CommunityPostShort from '@/components/community/post-short';
import GuildUserCard from '@/components/guildUser/GuildUserCard';
import { guildUser } from '@/types/guild';

export default function GuildDetails() {
  const allTags = [...dummyGuild.friendly, ...dummyGuild.gender, ...dummyGuild.play_style, ...dummyGuild.skill_level];
  const dummyGuildUsers = new Array<guildUser>(9).fill(dummyGuildUser);

  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      <div className="flex gap-6 w-[67%] self-center">
        <div className="flex flex-col gap-4 min-w-[628px] aspect-[16/7]">
          <img src={dummyGuild.img_src} alt="" className="rounded-3xl" />
          <Button variant="outline" className="w-fit px-4 py-2 text-neutral-500">
            <ClipboardPenIcon />
            <span>길드 관리</span>
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-bold text-5xl text-neutral-900">{dummyGuild.guild_name}</p>
          <div className="flex gap-2">
            {allTags.map((e, ind) => (
              <Tag style="retro" size="small" background="dark" className="" key={ind}>
                {e}
              </Tag>
            ))}
          </div>
          <p className="text-sm text-neutral-900 font-medium line-clamp-4 text-ellipsis">{dummyGuild.description}</p>
          <div className="flex gap-6">
            <div className="w-36 bg-neutral-100 rounded-lg aspect-square flex flex-col items-center justify-center gap-2">
              <p>CAPTAIN</p>
              <img src={dummyGuild.owner.img_src} alt="" className="w-12 rounded-full " />
              <p>{dummyGuild.owner.nickname}</p>
            </div>
            <div className="w-36 bg-neutral-100 rounded-lg aspect-square flex flex-col items-center justify-center">
              <p>MEMBERS</p>
              <p>
                <span className="text-4xl font-extrabold">{`${dummyGuild.num_members}`}</span>
                <span>{`/ ${60}`}</span>
              </p>
            </div>
          </div>
          <RetroButton type="purple" className="w-60">
            길드 참여
          </RetroButton>
        </div>
      </div>
      <PlayOnRollingBanner direction="right" duration={20} />
      <div className="flex flex-col w-[67%] self-center">
        <div className="flex w-full justify-between">
          <p className="text-4xl font-bold text-neutral-900">공지</p>
          <div className="flex items-center">
            <p className="text-xl font-medium text-neutral-900">전체 보기</p>
            <ChevronRight />
          </div>
        </div>
        <div className="flex flex-col">
          <CommunityPostImageLong data={dummyPost} className="h-44 border-b border-neutral-400" />
          <CommunityPostLong data={dummyPost} className="h-44" />
        </div>
      </div>
      <div className="flex flex-col w-[67%] self-center gap-8">
        <p className="text-4xl font-bold text-neutral-900">멤버</p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-6">
          {dummyGuildUsers.map((e, ind) => (
            <GuildUserCard key={`${e.user.username}_${ind}`} data={e} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 w-[67%] self-center">
        <div className="flex w-full justify-between">
          <p className="text-4xl font-bold text-neutral-900">길드 최신글</p>
          <div className="flex items-center">
            <p className="text-xl font-medium text-neutral-900">전체 보기</p>
            <ChevronRight />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <CommunityPostShort data={dummyPost} className="h-52" />
          <CommunityPostImageShort data={dummyPost} className="h-52" />
          <CommunityPostImageShort data={dummyPost} className="h-52" />
          <CommunityPostShort data={dummyPost} className="h-52" />
        </div>
      </div>
    </div>
  );
}
