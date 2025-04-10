import { create } from 'zustand';
import { userDetail } from '@/types/user';

export const useAuthStore = create<{
  user: userDetail | undefined;
  setUser: (input: userDetail | undefined) => void;
}>((set, get) => ({
  user: undefined,
  setUser: (input: userDetail | undefined) => {
    set({ user: input });
  },
}));
