import { create } from 'zustand';

type AlertState = {
  isOpen: boolean;
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancle?: () => void;
  showAlert: (title: string, description: string, onConfirm?: () => void, onCancle?: () => void) => void;
  closeAlert: () => void;
};

export const useAlertStore = create<AlertState>((set) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: undefined,
  onCancle: undefined,

  showAlert: (title, description, onConfirm, onCancle) => {
    set({ isOpen: true, title, description, onConfirm, onCancle });
  },

  closeAlert: () => {
    set({ isOpen: false });
  },
}));
