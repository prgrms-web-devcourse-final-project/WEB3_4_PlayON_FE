import { create } from 'zustand';
import { useMembers } from '@/api/members';
import { userDetail } from '@/types/user';

export const useAuthStore = create<{
  user: userDetail | undefined;
  setUser: (input: userDetail) => void;
}>((set, get) => ({
  user: undefined,
  setUser: (input: userDetail) => {
    set({ user: input });
  },
}));
