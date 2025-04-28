import formatDate from '@/utils/formatDate';
import { create } from 'zustand';

interface GameSearchState {
  name: string | undefined;
  setName: (newName: string) => void;
  mac: 'true' | undefined;
  setMac: (newMacSup: 'true' | undefined) => void;
  releaseDate: Date | undefined;
  setReleaseDate: (newReleaseDate: Date | undefined) => void;
  getQuery: () => string;
}

export const gameSearchStore = create<GameSearchState>((set, get) => ({
  name: undefined,
  setName: (newName: string) => {
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
  getQuery: () => {
    const name = get().name;
    const mac = get().mac;
    const releaseDate = get().releaseDate;
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
    if (allUndefined) {
      return '';
    } else {
      return `?${retStr}`;
    }
  },
}));
