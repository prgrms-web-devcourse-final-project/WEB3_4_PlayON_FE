import { GuildDetailMemberResponse, GuildLIstRequest, GuildSimple } from './../types/guildApi';
import { GUILD_ENDPOINTS as GUILD } from '@/constants/endpoints/guild';
import { useAxios } from '@/hooks/useAxios';
import { guild } from '@/types/guild';
import {
  GuildDetailResponse,
  GuildMainResponse,
  GuildUpdateRequest,
  GuildCreateRequest,
  GuildAdminResponse,
} from '@/types/guildApi';
import categorizeTags from '@/utils/categorizeTags';
import { uploadToS3 } from '@/utils/uploadToS3';

export const useGuild = () => {
  const axios = useAxios();

  async function GetGuild(guildId: string) {
    const response = await axios.TypedGet<GuildDetailResponse>(GUILD.detail(guildId), {}, true);
    const data = response?.data;
    // console.log(data);
    if (data) {
      const tags = categorizeTags(data?.tags);
      const guildDetail: guild = {
        guild_id: data.id,
        guild_name: data.name,
        description: data.description,
        img_src: data.guildImg || '/img/hero/bg_community_main.webp',
        num_members: data.memberCount,
        max_members: data.maxMembers,
        owner: {
          username: 'test',
          nickname: data.leaderName,
          user_title: '',
          img_src: data.leaderImg || '/img/dummy_profile.jpg',
          memberId: '',
        },
        created_at: new Date(data.createdAt),
        myRole: data.myRole,
        play_style: tags.play_style,
        skill_level: tags.skill_level,
        gender: tags.gender,
        friendly: tags.friendly,
      };
      // console.log(guildDetail);
      return guildDetail;
    }
    return false;
  }

  async function UpdateGuild(guildId: string, newData: GuildUpdateRequest) {
    try {
      const response = await axios.Put(GUILD.modify(guildId), newData, {}, true);
      const data = response?.data.data;
      console.log(data);
      return { guildId: data.id, presignedUrl: data.presignedUrl };
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteGuild(guildId: string) {
    const response = await axios.Delete(GUILD.delete(guildId), {}, true);
    const data = response?.data;
    if (data.msg === 'OK') {
      alert('삭제되었습니다!');
    }
    console.log(data);
    return data;
  }

  async function GetGuildList(request: GuildLIstRequest, page?: number, pageSize?: number, sort?: string) {
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
    // console.log(response);
    const data = response?.data.data.items;
    // console.log(data);
    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item: GuildSimple) => {
        const tags = categorizeTags(item.tags);
        return {
          guild_id: item.guildId,
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
      return {
        currentPageNumber: response.data.data.currentPageNumber,
        pageSize: response.data.data.pageSize,
        totalItems: response.data.data.totalItems,
        totalPages: response.data.data.totalPages,
        guildList: guildList,
      };
    }
    console.log('데이터가 없습니다.');
    return null;
  }

  async function CreateGuild(newData: GuildCreateRequest) {
    try {
      const response = await axios.Post(GUILD.create, newData, {}, true);
      const data = response?.data.data;
      console.log(data);
      return { guildId: data.id, presignedUrl: data.presignedUrl };
    } catch (error) {
      console.log(error);
    }
  }

  async function CreateGuildWithImg(newData: GuildCreateRequest, imageFile: File | null) {
    try {
      // 1. 길드 생성
      const createResponse = await CreateGuild(newData);
      if (createResponse && imageFile) {
        const { guildId, presignedUrl } = createResponse;
        // 2. S3 presigned URL로 이미지 업로드
        const s3Response = await uploadToS3(imageFile, presignedUrl);
        if (s3Response.success) {
          const imageUrl = s3Response.url;
          console.log('이미지 업로드 완료: ', imageUrl);
          // 3. 이미지 URL 서버에 등록
          await UploadImageURL(guildId, imageUrl);
          console.log('길드 생성 완료(이미지O)');
          return true;
        }
      }
      console.log('길드 생성 완료(이미지X)');
      return true;
    } catch (error) {
      console.log('길드 생성 중 오류 발생: ', error);
    }
  }
  async function UpdateGuildWithImg(guildId: string, newData: GuildUpdateRequest, imageFile: File | null) {
    try {
      // 1. 길드 수정
      const updateResponse = await UpdateGuild(guildId, newData);
      if (updateResponse && imageFile) {
        const { guildId, presignedUrl } = updateResponse;
        // 2. S3 presigned URL로 이미지 업로드
        const s3Response = await uploadToS3(imageFile, presignedUrl);
        if (s3Response.success) {
          const imageUrl = s3Response.url;
          console.log('이미지 업로드 완료: ', imageUrl);
          // 3. 이미지 URL 서버에 등록
          await UploadImageURL(guildId, imageUrl);
          console.log('길드 수정 완료(이미지O)');
          return true;
        }
      }
      console.log('길드 수정 완료(이미지X)');
      return true;
    } catch (error) {
      console.log('길드 수정 중 오류 발생: ', error);
    }
  }

  async function GetAdmin(guildId: string) {
    const response = await axios.TypedGet<GuildAdminResponse>(GUILD.admin(guildId), {}, true);
    const data = response?.data;
    // console.log(data);
    if (data) {
      const tags = categorizeTags(data.tags);
      const guildDetail: guild & { managerNames: string[] } = {
        guild_id: data.id,
        guild_name: data?.name,
        description: 'test',
        img_src: data.guildImg,
        num_members: data.memberCount,
        max_members: data.memberCount,
        owner: { username: 'test', nickname: data.leaderName, user_title: '', img_src: '', memberId: '' },
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

  async function GetGuildMembers(guildId: string) {
    const response = await axios.TypedGet<GuildDetailMemberResponse>(GUILD.detail_member(guildId), {}, true);
    console.log(response);
    const data = response?.data;
    console.log(data);
    if (response && data && data.length > 0) {
      const guildMemberList = data.map((member) => {
        return {
          username: member.username,
          nickname: member.nickname,
          title: member.title,
          role: member.role,
          img_src: member.profileImg || '/img/dummy_profile.jpg',
          member_id: member.memberId,
          joined_at: new Date(member.joinedAt),
        };
      });
      console.log(guildMemberList);
      return guildMemberList;
    }
    return false;
  }

  async function UploadImageURL(guildId: string, url: string) {
    const response = await axios.Post(GUILD.upload_image(guildId), { url: url }, {}, true);
    console.log(response);
    if (response?.status === 204) {
      return true;
    }
    return false;
  }

  async function GetGuildRecommend(appid: number, count?: number) {
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
          guild_id: item.guildId,
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          max_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: '', img_src: 'test', memberId: '' },
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

  async function GetGuildPopular() {
    const response = await axios.TypedGet<GuildMainResponse>(GUILD.popular, {}, true);
    const data = response?.data;
    // console.log(data);
    if (data && data.length > 0) {
      const guildList: guild[] = data.map((item) => {
        const tags = categorizeTags(item.tags);
        return {
          guild_id: item.guildId,
          guild_name: item.name,
          description: item.description,
          img_src: item.guildImg,
          num_members: item.memberCount,
          max_members: item.memberCount,
          owner: { username: 'test', nickname: 'test', user_title: '', img_src: 'test', memberId: '' },
          created_at: new Date(1),
          myRole: 'test',
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
      console.log('GuildPopular', guildList);
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
    CreateGuildWithImg,
    UpdateGuildWithImg,
  };
};
