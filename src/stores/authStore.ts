import { create } from 'zustand';
import { userDetail } from '@/types/user';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist<{
    user: userDetail | undefined;
    setUser: (input: userDetail | undefined) => void;
    logout: () => void;
  }>(
    (set, get) => ({
      user: undefined,
      setUser: (input: userDetail | undefined) => {
        set({ user: input });
      },
      logout: () => {
        set({ user: undefined });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
