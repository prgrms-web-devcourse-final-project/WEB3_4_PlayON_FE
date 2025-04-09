import { GUILD_ENDPOINTS as GUILD } from '@/constants/endpoints/guild';
import { useAxios } from '@/hooks/useAxios';
import { guild } from '@/types/guild';
import { GuildDetailResponse, Sort, GuildMainResponse, GuildUpdateRequest, GuildCreateRequest } from '@/types/guildApi';

export const useGuild = () => {
  const axios = useAxios();

  // ✅ 파싱 완료, 테스트 완료
  async function GetGuild(guildId: string) {
    const response = await axios.TypedGet<GuildDetailResponse>(GUILD.detail(guildId), {}, true);
    const data = response?.data;
    if (data) {
      const guildDetail: guild = {
        guild_name: data?.name,
        description: data?.description,
        img_src: data?.guildImg,
        num_members: data?.memberCount,
        owner: { username: 'test', nickname: data.leaderName, user_title: 'title', img_src: data.leaderImg },
        created_at: new Date(data.createdAt),
        myRole: data.myRole,
        // 🔥 tags 타입 추가되면 수정하기
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

  // ✅ ⚠️ 테스트 완료 (풀 받고 다시 확인해보기)
  async function UpdateGuild(guildId: string, newData: GuildUpdateRequest) {
    const response = await axios.Put(GUILD.modify(guildId), newData, {}, true);
    const data = response?.data;
    console.log(data);
    return data;
  }

  // ✅ 테스트 완료
  async function DeleteGuild(guildId: string) {
    const response = await axios.Delete(GUILD.delete(guildId), {}, true);
    const data = response?.data;
    console.log(data);
    return data;
  }

  // ❌ 테스트 불가
  async function GetGuildList(request: object, page?: number, pageSize?: number, sort?: Sort) {
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

  // ✅  테스트 완료
  async function CreateGuild(newData: GuildCreateRequest) {
    try {
      const response = await axios.Post(GUILD.create, newData, {}, true);
      const data = response?.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // ❌ 테스트 불가 (로직 수정 중)
  async function UploadImageURL(guildId: string, url: string) {
    const response = await axios.Post(GUILD.upload_image(guildId), { url }, {}, true);
    console.log(response);
  }

  // ✅  테스트 완료
  async function GetAdmin(guildId: string) {
    const response = await axios.Get(GUILD.admin(guildId), {}, true);
    const data = response?.data;
    console.log(data);
    return data;
  }

  // ✅ 파싱 완료, 테스트 완료
  async function GetGuildRecommend(appid: string, count?: number) {
    const response = await axios.TypedGet<GuildMainResponse>(
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

    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item) => {
        return {
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: 'title', img_src: 'test' },
          created_at: new Date(1),
          myRole: 'test',
          // 🔥 tags 타입 추가되면 수정하기
          play_style: ['노멀', '도전과제'],
          skill_level: ['뉴비', '마스터'],
          gender: ['남자만'],
          friendly: ['게임 전용'],
        };
      });
      console.log(guildList);
      return guildList;
    }
    return null;
  }

  // ⚠️ 파싱 완료, 테스트 불가
  async function GetGuildPopular() {
    const response = await axios.TypedGet<GuildMainResponse>(GUILD.popular, {}, true);
    const data = response?.data;
    console.log(data);
    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item) => {
        return {
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: 'title', img_src: 'test' },
          created_at: new Date(1),
          myRole: 'test',
          // 🔥 tags 타입 추가되면 수정하기
          play_style: ['노멀', '도전과제'],
          skill_level: ['뉴비', '마스터'],
          gender: ['남자만'],
          friendly: ['게임 전용'],
        };
      });
      return guildList;
    }
    return null;
  }

  return {
    GetGuild,
    UpdateGuild,
    DeleteGuild,
    GetGuildList,
    CreateGuild,
    UploadImageURL,
    GetAdmin,
    GetGuildRecommend,
    GetGuildPopular,
  };
};
