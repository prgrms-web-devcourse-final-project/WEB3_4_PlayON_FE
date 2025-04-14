import { create } from 'zustand';

type AlertState = {
  isOpen: boolean;
  onAction: (memberId: number) => Promise<void>;
  actionName: string;
  showAction: (onAction: (memberId: number) => Promise<void>, actionName: string) => void;
  closeAction: () => void;
};

export const useInviteStore = create<AlertState>((set) => ({
  isOpen: false,
  onAction: async () => {},
  actionName: '',
  showAction: (onAction, actionName) => {
    set({ isOpen: true, onAction, actionName });
  },
  closeAction: () => {
    set({ isOpen: false });
  },
}));
