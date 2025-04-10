'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import Tag from '@/components/common/Tag';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dummyGuild, dummyGuildUser, dummyUserSimple } from '@/utils/dummyData';
import UserApprove from '@/app/party/components/UserApprove';
import GuildUser from '@/components/guildUser/GuildUser';
import { useGuildsMembers } from '@/api/guild-member';
import { useEffect, useState } from 'react';
import { guildUser } from '@/types/guild';
import { useParams } from 'next/navigation';
import { userDetail } from '@/types/user';

interface guildUserProps {
  memberId: string;
  data: guildUser;
  index: number;
  total: number;
}


export function parseGuildUser(raw: any): guildUser {
  const user: userDetail = {
    username: raw.username,
    nickname: raw.username,
    user_title: '',
    img_src: raw?.profileImg ?? '',
    last_login_at: raw?.lastLoginAt ? new Date(raw.lastLoginAt) : new Date(),
    steam_id: '',
    gender: '남자',
    party_style: '맛보기',
    skill_level: '뉴비',
  };

  return {
    user,
    guild_role: raw.guildRole,
    joined_at: new Date(raw.joinedAt),
    num_guild_posts: raw.postCount,
  };
}
export default function GuildAdmin() {
  const allTags = [...dummyGuild.friendly, ...dummyGuild.gender, ...dummyGuild.play_style, ...dummyGuild.skill_level];
  const numDays = Math.trunc((new Date().getTime() - dummyGuild.created_at.getTime()) / 1000 / 60 / 60);
  const managers = [dummyGuildUser, dummyGuildUser, dummyGuildUser];
  const [members, setMembers] = useState<guildUserProps[]>([]);

  const { PutManager, DeleteManager, GetMembers, InviteMembers, DeleteMembers, GetAdmin, LeaveMembers, LeaveMembers2 } =
    useGuildsMembers();


  const params = useParams();
  const guildid = params?.guildid as string;

  useEffect(() => {
    //   const testPut = async () => {
    //     const membersRes = await PutManager('2', '8');
    //     console.log('멤버 리스트', membersRes);
    //   };
    //   testPut();

    // const testDelete = async () => {
    //   const membersRes = await DeleteManager('2', '8');
    //   console.log('멤버 리스트', membersRes);
    // };
    // testDelete();

    // const testGet = async () => {
    //   const membersRes = await GetMembers('2');
    //   console.log('멤버 리스트', membersRes);
    //   // console.log('guildid',guildId);
    // };
    // testGet();

    // const testGetAdmin = async () => {
    //   const membersRes = await GetAdmin('2');
    //   console.log('getAdmin 멤버 리스트', membersRes);
    // };
    // testGetAdmin();

    // const testPost = async () => {
    //   const membersRes = await InviteMembers('2', 'partyOwner');
    //   if (membersRes.status === 200) {
    //     console.log('멤버 리스트', membersRes);
    //   } else {
    //     console.log('실패', membersRes?.data?.message);
    //   }
    // };
    // testPost();

    // const testDeletemem = async () => {
    //   const membersRes = await DeleteMembers('2', '3');
    //   console.log('멤버 리스트', membersRes);
    // };
    // testDeletemem();

    // const testLeave = async () => {
    //   const membersRes = await LeaveMembers2('2', '1');
    //   console.log('멤버 리스트', membersRes);
    // };
    // testLeave();
  }, []);



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetMembers(guildid);
        console.log('raw data:', data);

        if (data?.data) {
          const parsed = data.data.map(parseGuildUser);
          console.log('parsed data:', parsed);

          setMembers(
            parsed.map((user, index) => ({
              memberId: data.data[index]?.memberId || `temp-${index}`,
              data: user,
              index,
              total: data.data.length,
            }))
          );
        } else {
          console.log('data.data is empty');
        }
      } catch (error) {
        console.error('Error fetching guild members:', error);
      }
    }
    console.log('guildId:', guildid);

    fetchData();
  }, [guildid]);
  
  // console.log('멤버 데이터:', members);
  
  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      <div className="flex gap-6 w-[67%] self-center">
        <div className="w-[300px] aspect-square overflow-hidden">
          <img src={dummyGuild.img_src} alt="" className="h-full object-cover rounded-3xl" />
        </div>
        <div className="flex flex-col flex-auto gap-5">
          <p className="text-5xl text-neutral-900 font-bold">{dummyGuild.guild_name}</p>
          <div className="flex flex-col gap-3">
            <p>
              <span className="text-lg text-neutral-900">{`함께한지 `}</span>
              <span className="text-lg text-neutral-900 font-bold">{numDays}</span>
              <span className="text-lg text-neutral-900">{` 일째`}</span>
            </p>
            <div className="flex gap-2">
              {allTags.map((e, ind) => (
                <Tag style="retro" size="small" background="dark" className="" key={ind}>
                  {e}
                </Tag>
              ))}
            </div>
          </div>
          <div className="border border-neutral-400 rounded-2xl py-8 px-9 grid grid-cols-2">
            <div className="text-lg flex">
              <span className="font-bold w-[120px]">결성일</span>
              <span>{dummyGuild.created_at.toLocaleDateString()}</span>
            </div>
            <div className="text-lg flex">
              <span className="font-bold w-[120px]">길드장</span>
              <span>{dummyGuild.owner.nickname}</span>
            </div>
            <div className="text-lg flex">
              <span className="font-bold w-[120px]">전체 인원</span>
              <span>{dummyGuild.num_members}</span>
            </div>
            <div className="text-lg flex">
              <span className="font-bold w-[120px]">운영진</span>
              <div className="flex">
                {managers.map((e, ind) => {
                  return (
                    <span
                      className={`px-4 ${ind === 0 ? 'pl-0' : ''} ${ind < managers.length - 1 ? 'border-r border-neutral-400' : ''}`}
                    >
                      {e.user.nickname}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PlayOnRollingBanner direction="left" duration={20} />
      <Accordion type="multiple" className="w-[67%] self-center">
        <AccordionItem value="item-1">
          <AccordionTrigger className="">
            <p className="text-3xl text-neutral-900 font-bold">길드 관리</p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex border border-neutral-400 rounded-lg gap-4 py-4 px-5">
                  <Button className="">길드 정보 변경하기</Button>
                  <Button variant={'outline'} className="border-0 shadow-none hover:bg-cherry-main hover:text-white">
                    길드 삭제
                  </Button>
                </div>
                <Button className="h-16">파티 생성</Button>
              </div>
              <div className="flex flex-col flex-auto border border-neutral-400 rounded-2xl px-6 py-8">
                <p className="text-2xl font-bold mb-3">길드 초대하기</p>
                <label htmlFor="" className="mb-1">
                  Email
                </label>
                <div className="flex gap-4">
                  <Input placeholder="초대받을 멤버의 이메일을 적어주세요"></Input>
                  <Button>초대장 발급</Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="">
            <p className="text-3xl text-neutral-900 font-bold">승인 대기 중</p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-6">
              <div className="border border-neutral-400 rounded-lg p-5">
                <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
              </div>
              <div className="border border-neutral-400 rounded-lg p-5">
                <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
              </div>
              <div className="border border-neutral-400 rounded-lg p-5">
                <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
              </div>
              <div className="border border-neutral-400 rounded-lg p-5">
                <UserApprove data={dummyUserSimple} onApprove={() => {}} onReject={() => {}} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="">
            <p className="text-3xl text-neutral-900 font-bold">멤버 관리</p>
          </AccordionTrigger>
          <AccordionContent>

            {members.map((member, index) => {
              return (
                <GuildUser
                  key={`${member.memberId}-${index}`}
                  data={member.data}
                  index={index}
                  total={members.length}
                />
              );
            })}

          </AccordionContent>
          
        </AccordionItem>
      </Accordion>
    </div>
  );
}
