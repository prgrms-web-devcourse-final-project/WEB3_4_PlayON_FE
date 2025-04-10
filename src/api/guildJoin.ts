import { GUILD_JOIN_ENDPOINTS as GuildJoin } from '@/constants/endpoints/guild-join';
import { useAxios } from '@/hooks/useAxios';

export const useGuildJoin = () => {
  const axios = useAxios();

  async function RequestGuildJoin(guildId: string) {
    const response = await axios.Post(GuildJoin.join(guildId), {}, {}, true);
    const data = response?.data;
    console.log(data);
  }

  async function RejectGuildJoin(guildId: string, requestId: string) {
    const response = await axios.Post(GuildJoin.reject(guildId, requestId), {}, {}, true);
    const data = response?.data;
    console.log(data);
  }

  async function ApproveGuildJoin(guildId: string, requestId: string) {
    const response = await axios.Post(GuildJoin.approve(guildId, requestId), {}, {}, true);
    const data = response?.data;
    console.log(data);
  }

  async function GetGuildJoinList(guildId: string) {
    const response = await axios.Get(GuildJoin.requests(guildId), {}, true);
    const data = response?.data;
    console.log(data);
  }

  return { RequestGuildJoin, RejectGuildJoin, ApproveGuildJoin, GetGuildJoinList };
};
