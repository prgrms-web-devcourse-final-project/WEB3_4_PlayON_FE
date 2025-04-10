import { GUILD_MEMBER_ENDPOINTS as guildMember } from '../constants/endpoints/guild-member';
import { useAxios } from '@/hooks/useAxios';

export const useGuildsMembers = () => {
  const axios = useAxios();

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

  async function DeleteManager(guildId: string, targetMemberId: string) {
    const response = await axios.Delete(guildMember.delete_manager(guildId), { data: { targetMemberId } }, true);
    const data = response?.data;
    console.log(data);
  }

  async function InviteMembers(guildId: string, nickname: string) {
    try {
      const response = await axios.Post(
        guildMember.invite(guildId),
        { guildId: guildId, nickname: nickname },
        { headers: { 'Content-Type': 'application/json' } },
        true
      );
      if (response?.status === 200) {
        const data = response?.data;
        console.log('성공 응답', data);
        return data;
      }
    } catch (err: any) {
      // console.log('에러 발생1', err.response?.data);
      console.log('에러 발생2', err.response);
      // return err.response?.data;
    }
  }

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
        // console.log('성공 응답2', data.data);
        return data;
      }
    } catch (err: any) {
      console.log('에러 발생2', err.response);
    }
  }
  async function DeleteMembers(guildId: string, targetMemberId: string) {
    const response = await axios.Delete(
      guildMember.delete_member(guildId),
      // { params: { guildId: guildId }, data: { targetMemberId: targetMemberId } },
      { data: { targetMemberId } },
      true
    );
    const data = response?.data;
    console.log(data);
    return data;
  }

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
  // async function LeaveMembers2(guildId: string, newLeaderId: string) {
  //   try {
  //     const response = await axios.Delete(
  //       guildMember.leave(guildId),
  //       {
  //         params: { guildId },
  //         data: { newLeaderId },
  //       },
  //       true
  //     );
  //     console.log('성공 응답', response?.data);
  //     return response?.data;
  //   } catch (error: any) {
  //     console.log('에러 발생1', error.response?.data);
  //     console.log('에러 발생2', error.response);
  //     // console.log('에러 발생3', response.data);
  //     return error.response?.data;
  //   }
  // }

  return { PutManager, DeleteManager, GetMembers, InviteMembers, DeleteMembers, GetAdmin, LeaveMembers };
};
