'use client';

import { useGuild } from '@/api/guild';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GuildCreateRequest, GuildUpdateRequest } from '@/types/guildApi';
import { ChangeEvent, useState } from 'react';

export default function Test() {
  const Guild = useGuild();
  const [image, setImage] = useState<File | null>(null);

  const newData_create: GuildCreateRequest = {
    name: '최종 테스트12 이미지 있음',
    description: '테스트입니다.',
    
    maxMembers: 3,
    isPublic: true,
    appid: 1,
    fileType: 'webp',
    tags: [
      { type: '파티 스타일', value: '스피드러너' },
      { type: '파티 스타일', value: '맛보기' },
      { type: '게임 실력', value: '마스터' },
      { type: '성별', value: '여자만' },
      { type: '친목', value: '친목 환영' },
    ],
  };

  const newData_update: GuildUpdateRequest = {
    name: '테스트 수정입니다 다시 다시 시도',
    description: 'test2 test2',
    maxMembers: 3,
    isPublic: true,
    appid: 1,
    newFileType: 'jpg',
    tags: [
      { type: '파티 스타일', value: '스피드러너' },
      { type: '파티 스타일', value: '맛보기' },
      { type: '게임 실력', value: '마스터' },
      { type: '성별', value: '여자만' },
      { type: '친목', value: '친목 환영' },
      { type: '게임 실력', value: '해커' },
    ],
  };

  const createGuild = async () => {
    await Guild.CreateGuildWithImg(newData_create, image);
    // console.log(response);
  };
  const updateGuild = async () => {
    await Guild.UpdateGuildWithImg('53', newData_update, image);
    // console.log(response);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  return (
    <div className="wrapper mt-32">
      <Input type="file" onChange={handleChange} className="w-[500px]" />
      <div className="inline-flex flex-col gap-5 mt-6">
        <Button onClick={createGuild}>길드 생성</Button>
        <Button onClick={updateGuild}>53번 길드 수정</Button>
      </div>
    </div>
  );
}
