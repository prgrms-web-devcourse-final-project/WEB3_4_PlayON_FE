import { GUILD_ENDPOINTS as GUILD } from '@/constants/endpoints/guild';
import { useAxios } from '@/hooks/useAxios';
import { guild } from '@/types/guild';

interface GuildTag {
  type: string;
  value: string;
}

export interface GuildRequest {
  name: string;
  description: string;
  maxMembers: number;
  appid: number;
  isPublic: boolean;
  fileType: FileType;
  tags: GuildTag[];
}

interface GuildResponse {
  msg: string;
  resultCode: string;
  data: {
    createdAt: string;
    description: string;
    guildImg: string;
    id: number;
    isPublic: boolean;
    leaderImg: string;
    leaderName: string;
    maxMembers: number;
    memberCount: number;
    myRole: string;
    name: string;
    tags: string[];
  };
}

// interface GuildPoplular

type FileType = 'png' | 'jpg' | 'jpeg' | 'webp';

export const useGuild = () => {
  const axios = useAxios();

  async function GetGuild(guildId: string) {
    const response = await axios.Get<GuildResponse>(GUILD.detail(guildId), {}, true);
    const data = response?.data.data;
    if (data) {
      const guildDetail: guild = {
        guild_name: data?.name,
        description: data?.description,
        img_src: data?.guildImg,
        num_members: data?.memberCount,
        owner: { username: 'test', nickname: data.leaderName, user_title: 'title', img_src: data.leaderImg },
        created_at: new Date(data.createdAt),
        myRole: data.myRole,
        play_style: ['노멀', '도전과제'],
        skill_level: ['뉴비', '마스터'],
        gender: ['남자만'],
        friendly: ['게임 전용'],
      };
      console.log(guildDetail);
      return guildDetail;
    }
    return null;
  }

  async function UpdateGuild(guildId: string, newData: GuildRequest) {
    const response = await axios.Put(GUILD.modify(guildId), newData, {}, true);
    const data = response?.data;
    console.log(data);
  }

  async function DeleteGuild(guildId: string) {
    const response = await axios.Delete(GUILD.delete(guildId), {}, true);
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

  async function GetAdmin(guildId: string) {
    const response = await axios.Get(GUILD.admin(guildId), {}, true);
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
    const response = await axios.Get(GUILD.popular, { params: { count: count } }, true);
    const data = response?.data;
    console.log(data);
  }

  async function UploadImageURL(fileType: FileType) {
    const response = await axios.Get(GUILD.upload_image, { params: { fileType: fileType } }, true);
    const url = response?.data;
    console.log(url);
    return url;
  }

  return {
    GetGuild,
    UpdateGuild,
    DeleteGuild,
    GetGuildList,
    CreateGuild,
    GetAdmin,
    GetGuildRecommend,
    GetGuildPopular,
    UploadImageURL,
  };
};
