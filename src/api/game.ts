import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import { useAxios } from '@/hooks/useAxios';

export const useGame = () => {
  type paging = {
    page: number;
    size: number;
    sort: string[];
  };
  type partyLog = {
    id: number;
    name: string;
    partyAt: Date;
    tags: string[];
    memberCount: number;
  };
  type party = {
    id: number;
    partyId: string;
    name: string;
    memberCount: number;
    tags: string[];
  };
  type game = {
    appid: number;
    name: string;
    headerImage: string;
    shortDescription: string;
    aboutTheGame: string;
    requiredAge: number;
    website: string;
    isWindowsSupported: true;
    isMacSupported: true;
    isLinuxSupported: true;
    releaseDate: Date;
    developers: string;
    publishers: string;
    screenshots: string[];
    movies: string[];
    genres: string[];
  };
  const axios = useAxios();

  async function GamePartyList(appid: number, pageable?: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.party(appid), { params: { ...pageable } }, true);
    console.log(response);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.data.currentPageNumber as number,
        pageSize: response.data.data.pageSize as number,
        totalPages: response.data.data.totalPages as number,
        totalItems: response.data.data.totalItems as number,
        items: response.data.data.items as party[],
      };
    }
    return false;
  }
  async function GamePartyLogList(appid: number, pageable?: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.logs(appid), { params: { ...pageable } }, true);
    console.log(response);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.data.currentPageNumber as number,
        pageSize: response.data.data.pageSize as number,
        totalPages: response.data.data.totalPages as number,
        totalItems: response.data.data.totalItems as number,
        items: response.data.data.items as partyLog[],
      };
    }
    return false;
  }
  async function GameDetailWithPartyLog(appid: number) {
    const response = await axios.Get(GAME_ENDPOINTS.details(appid), {}, true);
    if (response && response.status === 200) {
      console.log(response);
      return {
        game: response.data.data.game as game,
        partyList: response.data.data.partyList as party[],
        partyLogList: response.data.data.partyLogList as partyLog[],
      };
    }
    return false;
  }
  async function GameSearchByKeyword(keyword: string) {
    const response = await axios.Get(GAME_ENDPOINTS.search, { params: { keyword } }, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: string; name: string }[];
    }
    return false;
  }
  async function GameRecommendGenre() {
    const response = await axios.Get(GAME_ENDPOINTS.recommend, {}, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GameMostPlayTime() {
    const response = await axios.Get(GAME_ENDPOINTS.playTime, {}, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GameRecommendFriend() {
    const response = await axios.Get(GAME_ENDPOINTS.friends, {}, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GameRanking() {
    const response = await axios.Get(GAME_ENDPOINTS.ranking, {}, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GamePopular() {
    const response = await axios.Get(GAME_ENDPOINTS.popular, {}, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GameSearch(
    condition?: {
      keyword?: string;
      isMacSupported?: boolean;
      releaseAfter?: Date;
      releaseStatus?: Date;
      playerType?: string;
      genres?: string[];
    },
    pageable?: paging
  ) {
    const response = await axios.Get(GAME_ENDPOINTS.list, { params: { ...condition, ...pageable } }, true);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.data.currentPageNumber as number,
        pageSize: response.data.data.pageSize as number,
        totalPages: response.data.data.totalPages as number,
        totalItems: response.data.data.totalItems as number,
        items: response.data.data.items as { appid: number; name: string; headerImage: string; genres: string[] }[],
      };
    }
  }
  return {
    GamePartyList,
    GamePartyLogList,
    GameDetailWithPartyLog,
    GameSearchByKeyword,
    GameRecommendGenre,
    GameMostPlayTime,
    GameRecommendFriend,
    GameRanking,
    GamePopular,
    GameSearch,
  };
};
