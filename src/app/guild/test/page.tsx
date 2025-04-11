'use client';

import { useGuild } from '@/api/guild';
import { useGuildJoin } from '@/api/guildJoin';
import UserApprove from '@/app/party/components/UserApprove';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdditionalInfo, GuildCreateRequest } from '@/types/guildApi';
import { uploadToS3 } from '@/utils/uploadToS3';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Test() {
  const Guild = useGuild();
  const [data, setData] = useState<AdditionalInfo[]>();

  const newData_create: GuildCreateRequest = {
    name: '이미지 업로드용 webp10',
    description: 'test2 test2',
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

  const createGuid = async () => {
    await Guild.CreateGuild(newData_create);
  };

  const presignedUrl =
    'https://devcouse4-team14-bucket.s3.ap-northeast-2.amazonaws.com/guild/37/a4522cb1-103f-499e-be4a-8ac799c54c00.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250410T115851Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAXYKJUM6MMQJ6EN43%2F20250410%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=180&X-Amz-Signature=409b594502fbb8a9102d91e11b36ed9241b65d2cdb900276055c2d5d06dffb7d';

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data && data.length > 0) {
      console.log(data[0]);
      const response = await uploadToS3(data[0], presignedUrl);
      console.log(response);
    }
  };

  //  GuildJoin -----------------------------------------------
  const GuildJoin = useGuildJoin();

  const handleClickJoin = async () => {
    await GuildJoin.RequestGuildJoin('35');
  };
  const handleClickList = async () => {
    const data = await GuildJoin.GetGuildJoinRequests('35');
    if (data) {
      setData(data);
    }
  };
  const handleReject = async () => {
    await GuildJoin.RejectGuildJoin('35', '10');
  };
  const handleApprove = async () => {
    await GuildJoin.ApproveGuildJoin('35', '11');
  };
  return (
    <div className="wrapper mt-32">
      <Input type="file" onChange={handleChange} className="w-[500px]" />
      <div className="inline-flex flex-col gap-4 mt-3 ">
        <Button onClick={createGuid} className="bg-purple-500">
          길드 생성
        </Button>
        <Button onClick={handleClickJoin}>길드 참여 요청보내기</Button>
        <Button onClick={handleClickList}>길드 요청 리스트 확인</Button>
        <Button onClick={handleReject}>10번 요청 취소</Button>
        <Button onClick={handleApprove}>11번 요청 승인</Button>
        {data && <UserApprove data={data[0]} onApprove={() => {}} onReject={() => {}} />}
      </div>
    </div>
  );
}
