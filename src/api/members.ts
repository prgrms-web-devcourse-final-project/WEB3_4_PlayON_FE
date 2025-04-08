import { useAxios } from '@/hooks/useAxios';

export const useMembers = () => {
  const axios = useAxios();

  async function login(username: string, password: string) {
    const response = await axios.Post(
      'members/login',
      { username: username, password: password },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
  }
  async function Signup(username: string, password: string) {
    // const response = await axios.Post('');
  }

  return { login, Signup };
};
