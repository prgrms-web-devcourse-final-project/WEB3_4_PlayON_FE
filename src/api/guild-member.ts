import { GUILD_MEMBER_ENDPOINTS as guildMember } from '../constants/endpoints/guild-member';
import { useAxios } from '@/hooks/useAxios';

export const useGuildsMembers = () => {
  const axios = useAxios();

  // 매니저 권한 부여
  async function PutManager(guildId: string, targetMemberId: string) {
    const response = await axios.Put(
      guildMember.select_manager(guildId),
      { guildId: guildId, targetMemberId: targetMemberId },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  // 매니저 권한 회수
  async function DeleteManager(guildId: string, targetMemberId: string) {
    const response = await axios.Delete(guildMember.delete_manager(guildId), { data: { targetMemberId } }, true);
    const data = response?.data;
    console.log(data);
  }

  // 길드 멤버 초대
  async function InviteMembers(guildId: string, username: string) {
    try {
      const response = await axios.Post(
        guildMember.invite(guildId),
        { guildId: guildId, username: username },
        { headers: { 'Content-Type': 'application/json' } },
        true
      );
      if (response?.status === 200) {
        const data = response;
        console.log('성공 응답', data);
        return data;
      }
    } catch (err: any) {
      console.log('에러 발생2', err.response);
    }
  }

  // 길드 멤버 리스트
  async function GetMembers(guildId: string) {
    try {
      const response = await axios.Get(
        guildMember.list(guildId),
        {
          params: { guildId: guildId },
        },
        true
      );
      if (response?.status === 200) {
        const data = response.data;
        console.log('성공 응답1', data);
        return data;
      }
    } catch (err: any) {
      console.log('에러 발생2', err.response);
    }
  }

  // 멤버 퇴출
  async function DeleteMembers(guildId: string, targetMemberId: string) {
    const response = await axios.Delete(
      guildMember.delete_member(guildId),
      { data: { targetMemberId } },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  // 길드 관리페이지 길드정보

  async function GetAdmin(guildId: string) {
    const response = await axios.Get(
      guildMember.get_admin(guildId),
      {
        params: { guildId: guildId },
      },
      true
    );
    const data = response?.data;
    console.log(data);
    return data;
  }

  // 길드 탈퇴
  async function LeaveMembers(guildId: string, newLeaderId: string) {
    const response = await axios.Delete(
      guildMember.leave(guildId),
      {
        params: { guildId: guildId },
        data: { newLeaderId: newLeaderId },
      },
      true
    );
    const data = response?.data;
    console.log(data);
    console.log('호출');
  }


  return { PutManager, DeleteManager, GetMembers, InviteMembers, DeleteMembers, GetAdmin, LeaveMembers };
};
