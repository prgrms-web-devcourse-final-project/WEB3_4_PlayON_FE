import { GUILD_JOIN_ENDPOINTS as GuildJoin } from '@/constants/endpoints/guild-join';
import { useAxios } from '@/hooks/useAxios';
import { AdditionalInfo, GuildJoinRequestsResponse } from '@/types/guildApi';

export const useGuildJoin = () => {
  const axios = useAxios();

  async function RequestGuildJoin(guildId: string) {
    const response = await axios.Post(GuildJoin.join(guildId), {}, {}, true);
    const data = response?.data;
    console.log(data);
    if (data.msg === 'OK') {
      return true;
    }
    return false;
  }

  async function RejectGuildJoin(guildId: string, requestId: string) {
    const response = await axios.Post(GuildJoin.reject(guildId, requestId), {}, {}, true);
    const data = response?.data;
    console.log(data);
    if (data.msg === 'OK') {
      return true;
    }
    return false;
  }

  async function ApproveGuildJoin(guildId: string, requestId: string) {
    const response = await axios.Post(GuildJoin.approve(guildId, requestId), {}, {}, true);
    const data = response?.data;
    console.log(data);
    if (data.msg === 'OK') {
      return true;
    }
    return false;
  }

  async function GetGuildJoinRequests(guildId: string) {
    const response = await axios.TypedGet<GuildJoinRequestsResponse>(GuildJoin.requests(guildId), {}, true);
    const data = response;
    // console.log(data);
    if (data?.msg === 'OK' && data.data.length > 0) {
      const pendingUserList: AdditionalInfo[] = data.data.map((user) => ({
        img_src: user.profileImg ?? 'https://avatars.githubusercontent.com/u/124599?v=4',
        nickname: user.username,
        username: user.username,
        user_title: user.titleName,
        memberId: user.memberId,
        requestId: user.requestId,
        requestedAt: new Date(user.requestedAt),
        approvalState: user.approvalState,
      }));
      console.log(pendingUserList);
      return pendingUserList;
    }
    return null;
  }

  return { RequestGuildJoin, RejectGuildJoin, ApproveGuildJoin, GetGuildJoinRequests };
};
