'use client';

import PlayOnRollingBanner from '@/components/common/play-on-rolling-banner';
import Tag from '@/components/common/Tag';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserApprove from '@/app/party/components/UserApprove';
import GuildUser from '@/components/guildUser/GuildUser';
import { useGuildsMembers } from '@/api/guild-member';
import { useCallback, useEffect, useState } from 'react';
import { guildUser } from '@/types/guild';
import { useParams, useRouter } from 'next/navigation';
import { userDetail } from '@/types/user';
import { PATH } from '@/constants/routes';
import { useGuild } from '@/api/guild';
import { useAuthStore } from '@/stores/authStore';
import { useGuildJoin } from '@/api/guildJoin';
import { AdditionalInfo } from '@/types/guildApi';
import { useToast } from '@/hooks/use-toast';
import { useNotification } from '@/api/notification';
import { useMembers } from '@/api/members';

interface guildUserProps {
  memberId: string;
  data: guildUser;
  index: number;
  total: number;
}

// api 응답 데이터 파싱 함수
export function parseGuildUser(raw: any): guildUser {
  const user: userDetail = {
    username: raw.username,
    nickname: raw.nickname,
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
  const [members, setMembers] = useState<guildUserProps[]>([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingList, setPendingList] = useState<AdditionalInfo[]>([]);
  const params = useParams();
  const guildid = params?.guildid as string;
  const router = useRouter();
  const guild = useGuild();
  const guildJoin = useGuildJoin();
  const { user } = useAuthStore();
  const { PutManager, DeleteManager, GetMembers, InviteMembers, DeleteMembers, GetAdmin } = useGuildsMembers();
  const Toast = useToast();

  const [guildInfo, setGuildInfo] = useState<{
    name: string;
    imageUrl: string | null;
    tags: string[];
    createdDate: string;
    leaderNickname: string;
    totalMemberCount: number;
    managerNicknames: (string | null)[];
  } | null>(null);

  useEffect(() => {
    const fetchGuildInfo = async () => {
      try {
        const res = await GetAdmin(guildid);
        if (res.resultCode === 'OK') {
          setGuildInfo(res.data);
          console.log(res);
        }
      } catch (error: any) {
        console.error('길드 정보 불러오기 실패', error.response);
      }
    };
    fetchGuildInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildid]);

  const numDays = guildInfo?.createdDate
    ? Math.floor((new Date().getTime() - new Date(guildInfo.createdDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const fetchData = useCallback(async () => {
    try {
      const data = await GetMembers(guildid);
      // console.log('raw data:', data);

      if (data?.data) {
        const parsed = data.data.map(parseGuildUser);
        // console.log('parsed data:', parsed);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildid]);

  useEffect(() => {
    // console.log('guildId:', guildid);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildid]);


  const managers = members.filter((m) => m.data.guild_role === 'MANAGER');

  const auth = useAuthStore();
  // console.log('사용자 memberId', auth.memberId);
  const managersMamberid = managers.map((m) => m.memberId === String(auth?.memberId));

  // console.log('맞니??', managersMamberid);
  
  const isManager = managersMamberid.some(data => data === true);
  // console.log('매니져 있니없니', isManager);
  
  const notification = useNotification();
  const member = useMembers();
  const { toast } = useToast();


  // 길드 멤버 초대 핸들러
  const handleInviteMember = async (nickname: string) => {
    if (!nickname) {
      toast({ title: '닉네임을 입력해주세요', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const response = await member.SearchByNickname(nickname);
      // const invite_response = await InviteMembers(guildid, response.username);
      console.log(response);
      const notification_response = await notification.SendNotification({
        content: '님이 길드에 초대했습니다',
        receiverId: response[0].memberId,
        redirectUrl: `/guild/${guildid}`,
        type: 'PARTY_INVITE',
      });
      if (notification_response) {
        toast({ title: '초대장을 보냈습니다!', variant: 'primary' });
        setUsername('');
        // await fetchData();
      } else {
        toast({ title: '초대장 발급이 실패했습니다!', variant: 'destructive' });
      }
    } finally {
      setLoading(false);
    }
  };

  // 길드 멤버 매니저 권한 부여 & 회수 핸들러
  const handleToggleManager = async (memberId: string, role: string) => {
    try {
      console.log('Toggle 권한 변경: ', memberId, role);
      if (role === 'MEMBER') {
        await PutManager(guildid, memberId);
        await fetchData();
        // alert('매니저 권한이 부여 되었습니다.');
        Toast.toast({
          title: '매니저 권한이 부여 되었습니다.',
          variant: 'primary',
        });
      } else if (role === 'MANAGER') {
        await DeleteManager(guildid, memberId);
        await fetchData();
        // alert('매니저 권한이 회수되었습니다.');
        Toast.toast({
          title: '매니저 권한이 회수되었습니다.',
          variant: 'primary',
        });
      }
    } catch (error) {
      console.error('매니저 권한 변경 실패:', error);
      alert('권한 변경 실패');
    }
  };

  // 길드 멤버 퇴출 핸들러
  const handleKickMember = async (memberId: string) => {
    try {
      console.log('퇴출할 멤버: ', memberId);
      await DeleteMembers(guildid, memberId);
      // alert('해당 멤버가 퇴출되었습니다.');
      Toast.toast({
        title: '해당 멤버가 퇴출되었습니다.',
        variant: 'primary',
      });
      await fetchData();
    } catch (error) {
      console.error('멤버 퇴출 실패:', error);
      // alert('퇴출 실패');
      Toast.toast({
        title: '해당 멤버 퇴출이 불가합니다.',
        variant: 'default',
      });
    }
  };

  const isLeader = user?.nickname === guildInfo?.leaderNickname;

  const deleteGuild = useCallback(
    async () => {
      const response = await guild.DeleteGuild(guildid);
      // console.log(response);
      if (response) {
        Toast.toast({
          title: '길드가 삭제되었습니다.',
          variant: 'primary',
        });
      }
      router.push(PATH.guild_list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guildid]
  );

  const fetchPendingMemberList = useCallback(async () => {
    const response = await guildJoin.GetGuildJoinRequests(Number(guildid));
    console.log(response);
    if (response) {
      setPendingList(response);
    } else {
      setPendingList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveRequest = useCallback(
    async (requestId: number) => {
      const response = await guildJoin.ApproveGuildJoin(Number(guildid), requestId);
      if (response) {
        Toast.toast({
          title: '가입 요청을 승인 했습니다',
          variant: 'primary',
        });
      }
      console.log(response);
      fetchPendingMemberList();
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchPendingMemberList, guildid]
  );

  const rejectRequest = useCallback(
    async (requestId: number) => {
      const response = await guildJoin.RejectGuildJoin(Number(guildid), requestId);
      console.log(response);
      if (response) {
        Toast.toast({
          title: '가입 요청을 거절 했습니다',
          variant: 'primary',
        });
      }
      fetchPendingMemberList();
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchPendingMemberList, guildid]
  );

  useEffect(() => {
    fetchPendingMemberList();
  }, [fetchPendingMemberList]);

  // console.log('멤버 데이터:', members);

  return (
    <div className="flex flex-col mt-36 mb-36 gap-14">
      {guildInfo && (
        <div className="w-[67%] self-center flex flex-col gap-2">
          <div className=" self-end">
            <Button
              variant="outline"
              className="bg-white  hover:bg-purple-50 text-neutral-700"
              onClick={() => router.push(PATH.guild_detail(guildid))}
            >
              돌아가기
            </Button>
          </div>
          <div className="flex gap-6 ">
            <div className="w-[300px] aspect-square overflow-hidden">
              <img
                src={guildInfo.imageUrl || '/img/hero/bg_community_main.webp'}
                alt="guild"
                className="h-full object-cover rounded-3xl"
              />
            </div>
            <div className="flex flex-col flex-auto gap-5">
              <p className="text-5xl text-neutral-900 font-bold">{guildInfo.name}</p>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="text-lg text-neutral-900">{`함께한지 `}</span>
                  <span className="text-lg text-neutral-900 font-bold">{numDays}</span>
                  <span className="text-lg text-neutral-900">{` 일째`}</span>
                </p>
                <div className="flex gap-2">
                  {guildInfo.tags.slice(0, 8).map((tag, i) => (
                    <Tag key={i} style="retro" size="small" background="dark">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
              <div className="border border-neutral-400 rounded-2xl py-8 px-9 grid grid-cols-2">
                <div className="text-lg flex">
                  <span className="font-bold w-[120px]">결성일</span>
                  <span>{new Date(guildInfo.createdDate).toLocaleDateString()}</span>
                </div>
                <div className="text-lg flex">
                  <span className="font-bold w-[120px]">길드장</span>
                  <span>{guildInfo.leaderNickname}</span>
                </div>
                <div className="text-lg flex">
                  <span className="font-bold w-[120px]">전체 인원</span>
                  <span>{guildInfo.totalMemberCount}</span>
                </div>
                <div className="text-lg flex">
                  <span className="font-bold w-[120px]">운영진</span>
                  <div className="flex">
                    {managers.length > 0 ? (
                      managers.map((m, ind) => (
                        <span
                          key={m.memberId}
                          className={`px-4 ${ind === 0 ? 'pl-0' : ''} ${ind < managers.length - 1 ? 'border-r border-neutral-400' : ''}`}
                        >
                          {m.data.user.nickname}
                        </span>
                      ))
                    ) : (
                      <span className="text-neutral-500">없음</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  {isLeader && (
                    <Button
                      variant={'outline'}
                      className="border-0 shadow-none hover:bg-cherry-main hover:text-white"
                      onClick={deleteGuild}
                    >
                      길드 삭제
                    </Button>
                  )}
                </div>
                <Button className="h-16" onClick={() => router.push(PATH.party_create)}>
                  파티 생성
                </Button>
              </div>
              <div className="flex flex-col flex-auto border border-neutral-400 rounded-2xl px-6 py-8">
                <p className="text-2xl font-bold mb-3">길드 초대하기</p>
                <label htmlFor="" className="mb-1">
                  닉네임
                </label>
                <div className="flex gap-4">
                  <Input
                    placeholder="초대받을 멤버의 NICKNAME을 적어주세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Button onClick={() => handleInviteMember(username)} disabled={loading}>
                    {loading ? '초대 중...' : '초대장 발급'}
                  </Button>
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
            <div className="grid grid-cols-3 gap-x-6 gap-y-6">
              {pendingList.length > 0 ? (
                pendingList.map((user) => {
                  return (
                    <div key={user.memberId} className="border border-neutral-400 rounded-lg p-5 min-w-[288px]">
                      <UserApprove
                        data={user}
                        onApprove={() => approveRequest(user.requestId)}
                        onReject={() => rejectRequest(user.requestId)}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-lg text-neutral-500">요청이 없습니다.</p>
              )}
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
                  memberId={member.memberId}
                  data={member.data}
                  index={index}
                  total={members.length}
                  onToggleManager={() => handleToggleManager(member.memberId, member.data.guild_role)}
                  onKickMember={() => handleKickMember(member.memberId)}
                  isManager = {isManager}
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
