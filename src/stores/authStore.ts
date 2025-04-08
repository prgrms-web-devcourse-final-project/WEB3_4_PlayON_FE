import { create } from 'zustand';
import { apiInstance } from '@/utils/axiosInstance';

export const useAuthStore = create((set, get) => {
  function login() {
    console.log('login');
  }
  function logout() {
    console.log('logout');
  }
  return {
    user: undefined,
    login: login,
    logout: logout,
  };
});
