import { create } from 'zustand';

type AlertState = {
  isOpen: boolean;
  title: string;
  description?: string;
  onConfirm?: () => void;
  showAlert: (title: string, description: string, onConfirm?: () => void) => void;
  closeAlert: () => void;
};

export const useAlertStore = create<AlertState>((set, get) => ({
  isOpen: false,
  title: '',
  description: '',
  onConfirm: undefined,
  showAlert: (title, description, onConfirm) => {
    set({ isOpen: true, title, description, onConfirm });
    const current = get();
    console.log(current.isOpen);
    console.log(title);
    console.log(description);
    console.log(onConfirm);
  },
  closeAlert: () => set({ isOpen: false }),
}));
