import { GUILD_BOARD_ENDPOINTS } from '@/constants/endpoints/guild-board';
import { useAxios } from '@/hooks/useAxios';

const useGuildBoard = () => {
  const axios = useAxios();

  async function GuildPostDetail(guildId: string, boardId: string) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDetail(guildId, boardId), {}, true);
  }
  async function GuildPostChange(guildId: string, boardId: string) {
    const response = await axios.Put(GUILD_BOARD_ENDPOINTS.guildPostChange(guildId, boardId), {}, {}, true);
  }
  async function GuildPostDelete(guildId: string, boardId: string) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
  }
  async function GuildPostCommentChange(guildId: string, boardId: string, commentId: string) {
    const response = await axios.Put(
      GUILD_BOARD_ENDPOINTS.guildPostCommentChange(guildId, boardId, commentId),
      {},
      {},
      true
    );
  }
  async function GuildPostCommentDelete(guildId: string, boardId: string, commentId: string) {
    const response = await axios.Delete(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
  }
  async function GuildPostList(guildId: string) {
    const response = await axios.Get(GUILD_BOARD_ENDPOINTS.guildPostDelete(guildId, boardId), {}, true);
  }
  async function GuildPostCreate(guildId: string) {}
  async function GuildPostLike(guildId: string, boardId: string) {}
  async function GuildPostCommentCreate(guildId: string, boardId: string) {}
  async function GuildNoticesPost(guildId: string) {}
  async function GuildLatestPost(guildId: string) {}
  async function GuildPostImageUpload() {}
};
