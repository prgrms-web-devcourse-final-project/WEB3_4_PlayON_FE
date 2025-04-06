'use client';

import { dummyGuild } from '@/utils/dummyData';
import Tag from '@/components/common/Tag';
import { Button } from '@/components/ui/button';
import { ClipboardPenIcon } from 'lucide-react';
import RetroButton from '@/components/common/RetroButton';
import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';

export default function GuildDetails() {
  const allTags = [...dummyGuild.friendly, ...dummyGuild.gender, ...dummyGuild.play_style, ...dummyGuild.skill_level];

  return (
    <div className="flex flex-col mt-[100px]">
      <div className="flex gap-6 w-[67%] mb-16 self-center">
        <div className="flex flex-col gap-4">
          <img src={dummyGuild.img_src} alt="" className="w-[50%] min-w-[628px] rounded-3xl" />
          <Button variant="outline" className="w-fit px-4 py-2 text-neutral-500">
            <ClipboardPenIcon />
            <span>길드 관리</span>
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-bold text-5xl text-neutral-900">길드 이름</p>
          <div className="flex gap-2">
            {allTags.map((e, ind) => (
              <Tag style="retro" size="small" background="dark" className="" key={ind}>
                {e}
              </Tag>
            ))}
          </div>
          <p className="text-lg text-neutral-900 font-medium line-clamp-4 text-ellipsis">{dummyGuild.description}</p>
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
      <div className="flex flex-col">
        <div className="flex">
          <p className="text-4xl font-bold text-neutral-900 w-[67%] self-center">공지</p>
        </div>
      </div>
    </div>
  );
}
