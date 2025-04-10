import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import { useAxios } from '@/hooks/useAxios';
import { gameDetail } from '@/types/games';

export const useGame = () => {
  type paging = {
    page: number;
    size: number;
    sort: string[];
  };
  const axios = useAxios();

  async function GamePartyList(appid: number, pageable: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.party(appid), { params: { ...pageable } }, true);
    console.log(response);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.currentPageNumber as number,
        pageSize: response.data.pageSize as number,
        totalPages: response.data.totalPages as number,
        totalItems: response.data.totalItems as number,
        items: response.data.items as {
          id: number;
          name: string;
          partyAt: Date;
          tags: string[];
          memberCount: number;
        }[],
      };
    }
    return false;
  }
  async function GamePartyLogList(appid: number, pageable: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.logs(appid), { params: { ...pageable } }, true);
    console.log(response);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.currentPageNumber as number,
        pageSize: response.data.pageSize as number,
        totalPages: response.data.totalPages as number,
        totalItems: response.data.totalItems as number,
        items: response.data.items as {
          id: number;
          partyId: string;
          name: string;
          memberCount: number;
          tags: string[];
        }[],
      };
    }
    return false;
  }
  async function GameDetailWithPartyLog(appid: number) {
    const response = await axios.Get(GAME_ENDPOINTS.details(appid), {}, true);
    console.log(response);
  }
  async function GameSearchByKeyword(keyword: string) {
    const response = await axios.Get(GAME_ENDPOINTS.search, { params: { keyword } }, true);
    console.log(response);
  }
  async function GameRecommendGenre() {
    const response = await axios.Get(GAME_ENDPOINTS.recommend, {}, true);
    console.log(response);
  }
  async function GameMostPlayTime() {
    const response = await axios.Get(GAME_ENDPOINTS.playtime, {}, true);
    console.log(response);
  }
  async function GameRecommentFriend() {
    const response = await axios.Get(GAME_ENDPOINTS.friends, {}, true);
    console.log(response);
  }
  async function GameRanking() {
    const response = await axios.Get(GAME_ENDPOINTS.ranking, {}, true);
    console.log(response);
  }
  async function GamePopular() {
    const response = await axios.Get(GAME_ENDPOINTS.popular, {}, true);
    console.log(response);
  }
  async function GameSearch() {
    const response = await axios.Get(GAME_ENDPOINTS.list, {}, true);
    console.log(response);
  }
  return {
    GamePartyList,
    GamePartyLogList,
    GameDetailWithPartyLog,
    GameSearchByKeyword,
    GameRecommendGenre,
    GameMostPlayTime,
    GameRecommentFriend,
    GameRanking,
    GamePopular,
    GameSearch,
  };
};
