import formatDate from '@/utils/formatDate';
import { create } from 'zustand';

const genres = ['액션', '인디', '어드벤처', '시뮬레이션', 'RPG', '전략', '캐주얼'] as const;
const playerTypes = ['멀티플레이', '싱글플레이'] as const;
const releaseStatuses = ['발매', '출시예정'] as const;
interface GameSearchState {
  name: string | undefined;
  setName: (newName: string | undefined) => void;
  mac: 'true' | undefined;
  setMac: (newMacSup: 'true' | undefined) => void;
  releaseDate: Date | undefined;
  setReleaseDate: (newReleaseDate: Date | undefined) => void;
  releaseStatus: boolean[];
  toggleReleaseStatus: (value: string) => void;
  setReleaseStatus: (value: boolean[]) => void;
  playerType: boolean[];
  togglePlayerType: (value: string) => void;
  setPlayerType: (value: boolean[]) => void;
  genre: boolean[];
  toggleGenre: (value: string) => void;
  setGenre: (value: boolean[]) => void;
  getQuery: () => string;
}

export const gameSearchStore = create<GameSearchState>((set, get) => ({
  name: undefined,
  setName: (newName: string | undefined) => {
    set(() => ({ name: newName }));
  },
  mac: undefined,
  setMac: (newMacSup: 'true' | undefined) => {
    set(() => ({ mac: newMacSup }));
  },
  releaseDate: undefined,
  setReleaseDate: (newReleaseDate: Date | undefined) => {
    set(() => ({ releaseDate: newReleaseDate }));
  },
  releaseStatus: releaseStatuses.map(() => false),
  toggleReleaseStatus: (value: string) => {
    const newState = [...get().releaseStatus];
    const index = releaseStatuses.findIndex((_) => _ === value);
    if (index === -1) return;
    newState[index] = !newState[index];
    if (newState.filter((_) => _).length === releaseStatuses.length) {
      set(() => ({ releaseStatus: releaseStatuses.map(() => false) }));
    } else {
      set(() => ({ releaseStatus: newState }));
    }
  },
  setReleaseStatus: (value: boolean[]) => {
    set(() => ({ releaseStatus: [...value] }));
  },
  playerType: playerTypes.map(() => false),
  togglePlayerType: (value: string) => {
    const newState = [...get().playerType];
    const index = playerTypes.findIndex((_) => _ === value);
    if (index === -1) return;
    newState[index] = !newState[index];
    if (newState.filter((_) => _).length === playerTypes.length) {
      set(() => ({ playerType: playerTypes.map(() => false) }));
    } else {
      set(() => ({ playerType: newState }));
    }
  },
  setPlayerType: (value: boolean[]) => {
    set(() => ({ playerType: [...value] }));
  },
  genre: [true, ...genres.map(() => false)],
  toggleGenre: (value: string) => {
    const newState = [...get().genre];
    const index = genres.findIndex((_) => _ === value);
    if (index === -1) return;
    newState[index + 1] = !newState[index + 1];
    if (newState.slice(1, newState.length).filter((_) => _).length === newState.length - 1) {
      set(() => ({ genre: [true, ...genres.map(() => false)] }));
    } else {
      set(() => ({ genre: newState }));
    }
  },
  setGenre: (value: boolean[]) => {
    set(() => ({ genre: [...value] }));
  },
  getQuery: () => {
    const name = get().name;
    const mac = get().mac;
    const releaseDate = get().releaseDate;
    const releaseStatus = get().releaseStatus;
    const playerType = get().playerType;
    const genre = get().genre;

    let allUndefined = true;
    let retStr = '';
    if (name) {
      allUndefined = false;
      retStr += `name=${name}&`;
    }
    if (mac) {
      allUndefined = false;
      retStr += `mac=${mac}&`;
    }
    if (releaseDate) {
      allUndefined = false;
      retStr += `releaseDate=${releaseDate}&`;
    }

    if (releaseStatus.filter((_) => _).length > 0) {
      allUndefined = false;
      const joinedStr = releaseStatus
        .map((_, ind) => (_ ? releaseStatuses[ind] : undefined))
        .filter((_) => _)
        .join(',');
      retStr += `releaseStatus=${joinedStr}&`;
    }
    if (playerType.filter((_) => _).length > 0) {
      allUndefined = false;
      const joinedStr = playerType
        .map((_, ind) => (_ ? playerTypes[ind] : undefined))
        .filter((_) => _)
        .join(',');
      retStr += `playerType=${joinedStr}&`;
    }
    if (genre.slice(1, genre.length).filter((_) => _).length > 0) {
      allUndefined = false;
      const joinedStr = genre
        .slice(1, genre.length)
        .map((_, ind) => (_ ? genres[ind] : undefined))
        .filter((_) => _)
        .join(',');
      retStr += `genre=${joinedStr}&`;
    }

    if (allUndefined) {
      return '';
    } else {
      return `?${retStr}`;
    }
  },
}));
