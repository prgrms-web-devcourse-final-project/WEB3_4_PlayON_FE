import { apiInstance } from '@/utils/axiosInstance';
import { MEMBERS } from './endpoints';

type signupRequest = {
  username: string;
  password: string;
};

type signupResponse = {
  resultCode: string;
  msg: string;
  data: {
    nickname: string;
    profileImg: string;
    playStyle: string;
    skillLevel: string;
    gender: string;
  };
};

export async function signup(request: signupRequest) {
  const response: signupResponse = await apiInstance.post(MEMBERS.signup, { ...request });
  console.log(response);
}
