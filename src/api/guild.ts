import { GuildDetailMemberResponse, GuildLIstRequest, GuildSimple } from './../types/guildApi';
import { GUILD_ENDPOINTS as GUILD } from '@/constants/endpoints/guild';
import { useAxios } from '@/hooks/useAxios';
import { guild } from '@/types/guild';
import {
  GuildDetailResponse,
  Sort,
  GuildMainResponse,
  GuildUpdateRequest,
  GuildCreateRequest,
  GuildAdminResponse,
} from '@/types/guildApi';
import categorizeTags from '@/utils/categorizeTags';

export const useGuild = () => {
  const axios = useAxios();

  // ✅ 파싱 완료, 테스트 완료
  async function GetGuild(guildId: string) {
    const response = await axios.TypedGet<GuildDetailResponse>(GUILD.detail(guildId), {}, true);
    const data = response?.data;
    console.log(data);
    if (data) {
      const tags = categorizeTags(data?.tags);
      const guildDetail: guild = {
        guild_name: data?.name,
        description: data?.description,
        img_src: data?.guildImg,
        num_members: data?.memberCount,
        owner: { username: 'test', nickname: data.leaderName, user_title: 'title', img_src: data.leaderImg },
        created_at: new Date(data.createdAt),
        myRole: data.myRole,
        play_style: tags.play_style,
        skill_level: tags.skill_level,
        gender: tags.gender,
        friendly: tags.friendly,
      };
      console.log(guildDetail);
      return guildDetail;
    }
    return null;
  }

  // ✅ 테스트 완료
  async function UpdateGuild(guildId: string, newData: GuildUpdateRequest) {
    const response = await axios.Put(GUILD.modify(guildId), newData, {}, true);
    const data = response?.data;
    if (data.msg === 'OK') {
      alert('수정되었습니다!');
    }
    console.log(data);
    return data;
  }

  // ✅ 테스트 완료
  async function DeleteGuild(guildId: string) {
    const response = await axios.Delete(GUILD.delete(guildId), {}, true);
    const data = response?.data;
    if (data.msg === 'OK') {
      alert('삭제되었습니다!');
    }
    console.log(data);
    return data;
  }

  // ❌ 테스트 실패
  async function GetGuildList(request: GuildLIstRequest, page?: number, pageSize?: number, sort?: Sort) {
    const response = await axios.Post(
      GUILD.list,
      request,
      {
        params: {
          page: page,
          pageSize: pageSize,
          sort: sort,
        },
      },
      true
    );
    const data = response?.data.data.items;
    // console.log(data);
    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item: GuildSimple) => {
        const tags = categorizeTags(item.tags);
        return {
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: 'title', img_src: 'test' },
          created_at: new Date(1),
          myRole: 'test',
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
      console.log(guildList);
      return guildList;
    }
    console.log('데이터가 없습니다.');
    return null;
  }

  // ✅  테스트 완료
  async function CreateGuild(newData: GuildCreateRequest) {
    try {
      const response = await axios.Post(GUILD.create, newData, {}, true);
      const data = response?.data.data;
      console.log(data);
      if (data) {
        alert('길드가 생성되었습니다!');
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // ✅  테스트 완료
  async function GetAdmin(guildId: string) {
    const response = await axios.TypedGet<GuildAdminResponse>(GUILD.admin(guildId), {}, true);
    const data = response?.data;
    // console.log(data);
    if (data) {
      const tags = categorizeTags(data.tags);
      const guildDetail: guild & { managerNames: string[] } = {
        guild_name: data?.name,
        description: 'test',
        img_src: data?.guildImg,
        num_members: data?.memberCount,
        owner: { username: 'test', nickname: data.leaderName, user_title: 'title', img_src: '' },
        created_at: new Date(data.createdAt),
        myRole: data.myRole,
        managerNames: data.managerNames,
        play_style: tags.play_style,
        skill_level: tags.skill_level,
        gender: tags.gender,
        friendly: tags.friendly,
      };
      console.log(guildDetail);
      return guildDetail;
    }
    return null;
  }

  //
  async function GetGuildMembers(guildId: string) {
    const response = await axios.TypedGet<GuildDetailMemberResponse>(GUILD.detail_member(guildId), {}, true);
    const data = response?.data;
    console.log(data);
  }

  // ❌ 테스트 불가 (로직 수정 중)
  async function UploadImageURL(guildId: string, url: string) {
    const response = await axios.Post(GUILD.upload_image(guildId), { url }, {}, true);
    console.log(response);
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
        const tags = categorizeTags(item.tags);
        return {
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: 'title', img_src: 'test' },
          created_at: new Date(1),
          myRole: 'test',
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
      console.log(guildList);
      return guildList;
    }
    console.log('데이터가 없습니다.');
    return null;
  }

  // ✅ 파싱 완료, 테스트 완료
  async function GetGuildPopular() {
    const response = await axios.TypedGet<GuildMainResponse>(GUILD.popular, {}, true);
    const data = response?.data;
    // console.log(data);
    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item) => {
        const tags = categorizeTags(item.tags);
        return {
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: 'title', img_src: 'test' },
          created_at: new Date(1),
          myRole: 'test',
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
      console.log(guildList);
      return guildList;
    }
    console.log('데이터가 없습니다.');
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
    GetGuildMembers,
    GetGuildRecommend,
    GetGuildPopular,
  };
};
