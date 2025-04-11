import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';
import { guildCommunityTags } from '@/types/Tags/communityTags';

export const useGuildBoard = () => {
  const axios = useAxios();
  type comment = {
    id: number;
    authorNickname: string;
    authorProfileImg: string;
    content: string;
    createdAt: Date;
  };
  type guild = {
    id: number;
    name: string;
    description: string;
    guildImg: string;
    memberCount: number;
  };
  type post = {
    id: number;
    title: string;
    content: string;
    tag: string;
    hit: number;
    likeCount: number;
    imageUrl: string;
    authorNickname: string;
    comments: comment[];
    guild: guild;
  };
  type noticesPost = {
    id: number;
    title: string;
    content: string;
    authorNickname: string;
    authorAvatar: string;
    likeCount: number;
    commentCount: number;
    imageUrl: string;
  };
  async function GuildPostDetail(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      const postData = response.data.data as post;
      return postData;
    }
    return false;
  }
  async function GuildPostChange(
    guildId: number,
    boardId: number,
    data: { title: string; content: string; tag: string; newFileType: string }
  ) {
    const response = await axios.Put(GUILD_BOARD_ENDPOINTS.guildPostChange(guildId, boardId), { ...data }, {}, true);
    if (response && response.status === 200) {
      return {
        id: response.data.data.id as number,
        presignedUrl: response.data.data.presignedUrl as string,
      };
    }
    return false;
  }
  async function GuildPostDelete(guildId: number, boardId: number) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
    if (response && response.status === 200) return true;
    return false;
  }
  async function GuildPostCommentChange(guildId: number, boardId: number, commentId: number, comment: string) {
    const response = await axios.Put(
      GUILD_BOARD_ENDPOINTS.guildPostCommentChange(guildId, boardId, commentId),
      { comment },
      {},
      true
    );
    if (response && response.status === 200) {
      return response.data.data as string;
    }
    return false;
  }
  async function GuildPostCommentDelete(guildId: number, boardId: number, commentId: number) {
    const response = await axios.Delete(
      GUILD_BOARD_ENDPOINTS.guildPostCommentDelete(guildId, boardId, commentId),
      {},
      true
    );
    if (response && response.status === 200) {
      return response.data.data as string;
    }
    return false;
  }
  async function GuildPostList(
    guildId: number,
    data: {
      tag?: string;
      keyword?: string;
      sort?: 'LATEST' | 'POPULAR';
      page?: number;
      pageSize?: number;
    }
  ) {
    console.log(data);
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostList(guildId), { params: { ...data } }, true);
    if (response && response.status === 200) {
      return {
        totalElements: response.data.data.totalElements as number,
        totalPages: response.data.data.totalPages as number,
        size: response.data.data.size as number,
        content: response.data.data.content as post[],
      };
    }
    return false;
  }
  async function GuildPostCreate(
    guildId: number,
    data: { title: string; content: string; tag: (typeof guildCommunityTags)[number]; imageUrl: string }
  ) {
    const response = await axios.Post(GUILD_BOARD_ENDPOINTS.guildPostCreate(guildId), { ...data }, {}, true);
    if (response && response.status === 200) {
      return {
        id: response.data.data.id as number,
        presignedUrl: response.data.data.presignedUrl as string,
      };
    }
    return false;
  }
  async function GuildPostLike(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostLike(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      return {
        liked: response.data.data.liked as boolean,
        likeCount: response.data.data.likeCount as number,
      };
    }
    return false;
  }
  async function GuildPostCommentCreate(guildId: number, boardId: number, comment: number) {
    const response = await axios.Post(
      GUILD_BOARD_ENDPOINTS.guildPostCommentCreate(guildId, boardId),
      { comment },
      {},
      true
    );
    if (response && response.status === 200) {
      return {
        id: response.data.data.id as number,
      };
    }
    return false;
  }
  async function GuildNoticesPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildNoticesPost(guildId), {}, true);
    if (response && response.status === 200) {
      return response.data.data as noticesPost[];
    }
    return false;
  }
  async function GuildLatestPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildLatestPost(guildId), {}, true);
    if (response && response.status === 200) {
      return response.data.data as noticesPost;
    }
    return false;
  }
  async function GuildPostImageUpload(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostImageUpload(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  return {
    GuildPostDetail,
    GuildPostChange,
    GuildPostDelete,
    GuildPostCommentChange,
    GuildPostCommentDelete,
    GuildPostList,
    GuildPostCreate,
    GuildPostLike,
    GuildPostCommentCreate,
    GuildNoticesPost,
    GuildLatestPost,
    GuildPostImageUpload,
  };
};
