import { game } from '@/api/game';
import { GAME_ENDPOINTS } from '@/constants/endpoints/game';
import { gameDetail } from '@/types/games';
import axios from 'axios';

function convertToClientGame(data: game): gameDetail {
  return {
    about: data.aboutTheGame,
    detail_desc: data.aboutTheGame,
    developer: [data.developers],
    genre: data.genres,
    homepage_url: data.website,
    img_src: data.headerImage,
    movie_src: data.movies,
    screenshot_src: data.screenshots,
    os: {
      linux: data.isLinuxSupported,
      mac: data.isMacSupported,
      windows: data.isWindowsSupported,
    },
    publisher: [data.publishers],
    release_date: data.releaseDate,
    short_desc: data.shortDescription,
    title: data.name,
  };
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export type GameQueryResType = {
  games: gameDetail[];
  totalItems: number;
  appIds: number[];
};
type Step = {
  keyword: string;
  isMacSupported: string;
  releaseDate: string;
  playerType: string;
  releaseStatus: string;
  genres: (string | undefined)[];
};
type Pagination = {
  page: number;
  size: number;
  sort: string[];
};
export async function getGames(step: Step, pagination: Pagination): Promise<GameQueryResType> {
  const response = await axios.post(API_BASE_URL + GAME_ENDPOINTS.list, { ...step }, { params: { ...pagination } });
  const totalItems = response.data.data.totalItems;
  const appIds: number[] = response.data.data.items.map(
    (_: { appid: number; name: string; headerImage: string; genres: string[] }) => _.appid
  );
  const gameData = await Promise.all(
    appIds.map(async (appid: number) => {
      const detailResponse = await axios.get(API_BASE_URL + GAME_ENDPOINTS.details(appid));
      if (detailResponse && detailResponse.status === 200) {
        return {
          game: detailResponse.data.data.game as game,
        };
      }
      return undefined;
    })
  );
  const validData = gameData.filter((_) => _ !== undefined).map((__) => convertToClientGame(__.game));
  return {
    games: validData,
    totalItems: totalItems,
    appIds: appIds,
  };
}
