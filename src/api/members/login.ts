import { apiInstance } from '@/utils/axiosInstance';
import { MEMBERS } from './endpoints';

type loginRequest = {
  username: string;
  password: string;
};

type loginResponse = {
  resultCode: string;
  msg: string;
  data: string;
};

export async function login(request: loginRequest) {
  const response = await apiInstance.post(MEMBERS.login, { ...request });
  console.log(response);
}
