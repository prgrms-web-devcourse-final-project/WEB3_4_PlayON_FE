import { useAxios } from '@/hooks/useAxios';

export const useMembers = () => {
  const axios = useAxios();

  function login(username: string, password: string) {
    axios.Post(
      'members/login',
      { username: username, password: password },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
  }
  function Signup() {}

  return { login, Signup };
};
