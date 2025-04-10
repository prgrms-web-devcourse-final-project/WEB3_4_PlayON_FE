import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';
import { post } from '@/types/community';
import { guildCommunityTags } from '@/types/Tags/communityTags';
import typeConverter from '@/utils/typeConverter';

export const useGuildBoard = () => {
  const axios = useAxios();

  type guildPostResponseType = {
    id: number;
    title: string;
    content: string;
    authorNickname: string;
    tag: string;
    likeCount: number;
    commentCount: number;
    hit: number;
    imageUrl: string;
    createdAt: string;
    guild: {
      id: number;
      name: string;
      description: string;
      guildImg: string;
      memberCount: number;
    };
  };
  async function GuildPostDetail(guildId: string, boardId: string) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId), {}, true);
    if (response && response.status === 200) {
      const responseData: post = {
        channel: '길드',
        tag: response.data.tag,
        user: response.data.user,
        comments: response.data.user,
        content: response.data.comment,
        created_at: response.data.created_at,
        hits: response.data.hits,
        img_src: response.data.img_src,
        num_likes: response.data.num_likes,
        title: response.data.title,
      };
      console.log(responseData);
    }
  }
  async function GuildPostChange(guildId: string, boardId: string) {
    const response = await axios.Put(GUILD_BOARD_ENDPOINTS.guildPostChange(guildId, boardId), {}, {}, true);
    console.log(response);
  }
  async function GuildPostDelete(guildId: string, boardId: string) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
    console.log(response);
  }
  async function GuildPostCommentChange(guildId: string, boardId: string, commentId: string) {
    const response = await axios.Put(
      GUILD_BOARD_ENDPOINTS.guildPostCommentChange(guildId, boardId, commentId),
      {},
      {},
      true
    );
    console.log(response);
  }
  async function GuildPostCommentDelete(guildId: string, boardId: string, commentId: string) {
    const response = await axios.Delete(
      GUILD_BOARD_ENDPOINTS.guildPostCommentDelete(guildId, boardId, commentId),
      {},
      true
    );
    console.log(response);
  }
  async function GuildPostList(
    guildId: string,
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
      const posts: guildPostResponseType[] = response.data.data.content;
      return posts;
    }
  }
  async function GuildPostCreate(
    guildId: string,
    data: { title: string; content: string; tag: (typeof guildCommunityTags)[number]; imageUrl: string }
  ) {
    const response = await axios.Post(GUILD_BOARD_ENDPOINTS.guildPostCreate(guildId), { ...data }, {}, true);
    console.log(response);
  }
  async function GuildPostLike(guildId: string, boardId: string) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostLike(guildId, boardId), {}, true);
    console.log(response);
  }
  async function GuildPostCommentCreate(guildId: string, boardId: string, comment: string) {
    const response = await axios.Post(
      GUILD_BOARD_ENDPOINTS.guildPostCommentCreate(guildId, boardId),
      { comment },
      {},
      true
    );
    console.log(response);
  }
  async function GuildNoticesPost(guildId: string) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildNoticesPost(guildId), {}, true);
    console.log(response);
  }
  async function GuildLatestPost(guildId: string) {
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
