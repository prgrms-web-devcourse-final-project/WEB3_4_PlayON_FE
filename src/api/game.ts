import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import { useAxios } from '@/hooks/useAxios';

export type paging = {
  page: number;
  size: number;
  sort?: string[];
};
export type partyMembers = {
  memberId: number;
  partyMemberId: number;
  username: string;
  title: string;
  nickname: string;
  profileImg: string;
};
export type partyLog = {
  partyId: number;
  name: string;
  gameName: string;
  mvpName: string;
  mvpPoint: number;
  mvpProfileImage: string;
  partyAt: Date;
  playTime: {
    hour: number;
    minute: number;
    second: number;
  };
  partyMembers: partyMembers[];
  partyTags: { tagValue: string }[];
};
export type party = {
  partyId: number;
  name: string;
  description: string;
  appId: number;
  gameName: string;
  partyAt: Date;
  minimum: number;
  maximum: number;
  total: number;
  members: [
    {
      memberId: number;
      profileImage: string;
    },
  ];
  partyTags: [
    {
      tagValue: string;
    },
  ];
};
export type game = {
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

export const useGame = () => {
  const axios = useAxios();

  async function GamePartyList(appid: number, pageable?: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.party(appid), { params: { ...pageable } }, true);
    if (response && response.status === 200) {
      return {
        currentPageNumber: response.data.data.currentPageNumber as number,
        pageSize: response.data.data.pageSize as number,
        totalPages: response.data.data.totalPages as number,
        totalItems: response.data.data.totalItems as number,
        items: response.data.data.items as party[],
      };
    }
    throw new Error('Failed to fetch');
  }
  async function GamePartyLogList(appid: number, pageable?: paging) {
    const response = await axios.Get(GAME_ENDPOINTS.logs(appid), { params: { ...pageable } }, true);
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
      return {
        game: response.data.data.game as game,
        partyList: response.data.data.partyList as party[],
        partyLogList: response.data.data.completedPartyList as partyLog[],
      };
    }
    throw new Error('Failed to fetch');
  }
  async function GameSearchByKeyword(keyword: string) {
    const response = await axios.Get(GAME_ENDPOINTS.search, { params: { keyword } }, true);
    if (response && response.status === 200) {
      return response.data.data as { appid: string; name: string }[];
    }
    return false;
  }
  async function GameRecommendGenre() {
    const response = await axios.Get(GAME_ENDPOINTS.recommend, {}, false);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    throw new Error('Failed to fetch');
  }
  async function GameMostPlayTime() {
    const response = await axios.Get(GAME_ENDPOINTS.playTime, {}, false);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    throw new Error('Failed to fetch');
  }
  async function GameRecommendFriend() {
    const response = await axios.Get(GAME_ENDPOINTS.friends, {}, false);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    throw new Error('Failed to fetch');
  }
  async function GameRanking() {
    const response = await axios.Get(GAME_ENDPOINTS.ranking, {}, false);
    if (response && response.status === 200) {
      return response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
    }
    return false;
  }
  async function GamePopular() {
    const response = await axios.Get(GAME_ENDPOINTS.popular, {}, false);
    if (response && response.status === 200) {
      const list = response.data.data as { appid: number; name: string; headerImage: string; genres: string[] }[];
      const formatted = list.map((e) => {
        return {
          title: e.name,
          genre: e.genres,
          img_src: e.headerImage,
          background_src: '',
          appid: e.appid,
        };
      });
      return formatted;
    }
    return [];
  }
  async function GameSearch(
    condition?: {
      keyword?: string;
      isMacSupported?: boolean;
      releaseAfter?: Date;
      releaseStatus?: string;
      playerType?: string;
      genres?: string;
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
        items: response.data.data.items as { appid: number; name: string; headerImage: string; genres: string }[],
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
