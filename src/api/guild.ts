import { GUILD_ENDPOINTS as GUILD } from '@/constants/endpoints/guild';
import { useAxios } from '@/hooks/useAxios';

export interface GuildTag {
  type: string;
  value: string;
}

export interface GuildRequest {
  name: string;
  description: string;
  maxMembers: number;
  gameId: number;
  isPublic: boolean;
  guildImg: string;
  tags: GuildTag[];
}

export const useGuild = () => {
  const axios = useAxios();

  async function GetGuild(guildId: string) {
    const response = await axios.Get(
      GUILD.detail(guildId),
      {
        params: {
          guildId: guildId,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  async function UpdateGuild(guildId: string, newData: GuildRequest) {
    const response = await axios.Put(
      GUILD.modify(guildId),
      newData,
      {
        params: {
          guildId: guildId,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  async function DeleteGuild(guildId: string) {
    const response = await axios.Delete(
      GUILD.delete(guildId),
      {
        params: {
          guildId: guildId,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  type sort = 'latest' | 'activity' | 'members';
  async function GetGuildList(request: object, page?: number, pageSize?: number, sort?: sort) {
    const response = await axios.Get(
      GUILD.list,
      {
        params: {
          page: page,
          pageSize: pageSize,
          sort: sort,
          request: request,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  async function CreateGuild(newData: GuildRequest) {
    const response = await axios.Post(GUILD.create, newData, {}, true);
    const data = response?.data;
    console.log(data);
  }

  async function GetGuildRecommend(appid: string, count?: number) {
    const response = await axios.Get(
      GUILD.recommend,
      {
        params: {
          count: count,
          appid: appid,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  async function GetGuildPopular(count?: number) {
    const response = await axios.Get(
      GUILD.popular,
      {
        params: {
          count: count,
        },
      },
      true
    );
    const data = response?.data;
    console.log(data);
  }

  return { GetGuild, UpdateGuild, DeleteGuild, GetGuildList, CreateGuild, GetGuildRecommend, GetGuildPopular };
};
