import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';
import { post } from '@/types/community';
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
  async function GuildPostDetail(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      const postData = response.data.data as post;
      return postData;
    }
  }
  async function GuildPostChange(guildId: number, boardId: number) {
    const response = await axios.Put(GUILD_BOARD_ENDPOINTS.guildPostChange(guildId, boardId), {}, {}, true);
    console.log(response);
  }
  async function GuildPostDelete(guildId: number, boardId: number) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
    console.log(response);
  }
  async function GuildPostCommentChange(guildId: number, boardId: number, commentId: number) {
    const response = await axios.Put(
      GUILD_BOARD_ENDPOINTS.guildPostCommentChange(guildId, boardId, commentId),
      {},
      {},
      true
    );
    console.log(response);
  }
  async function GuildPostCommentDelete(guildId: number, boardId: number, commentId: number) {
    const response = await axios.Delete(
      GUILD_BOARD_ENDPOINTS.guildPostCommentDelete(guildId, boardId, commentId),
      {},
      true
    );
    console.log(response);
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
    if (response) {
      const posts: post[] = response.data.data.content;
      return posts;
    }
  }
  async function GuildPostCreate(
    guildId: number,
    data: { title: string; content: string; tag: (typeof guildCommunityTags)[number]; imageUrl: string }
  ) {
    const response = await axios.Post(GUILD_BOARD_ENDPOINTS.guildPostCreate(guildId), { ...data }, {}, true);
    console.log(response);
  }
  async function GuildPostLike(guildId: number, boardId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostLike(guildId, boardId), {}, true);
    console.log(response);
  }
  async function GuildPostCommentCreate(guildId: number, boardId: number, comment: number) {
    const response = await axios.Post(
      GUILD_BOARD_ENDPOINTS.guildPostCommentCreate(guildId, boardId),
      { comment },
      {},
      true
    );
    console.log(response);
  }
  async function GuildNoticesPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildNoticesPost(guildId), {}, true);
    console.log(response);
  }
  async function GuildLatestPost(guildId: number) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildLatestPost(guildId), {}, true);
    console.log(response);
  }
  async function GuildPostImageUpload() {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostImageUpload(), {}, true);
    console.log(response);
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
