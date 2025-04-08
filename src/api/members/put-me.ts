import { apiInstance } from '@/utils/axiosInstance';
import { MEMBERS } from './endpoints';

type putMeRequest = {
  nickname: string;
  profileImg: string;
  playStyle: string;
  skillLevel: string;
  gender: string;
};

type putMeResponse = {
  resultCode: string;
  msg: string;
  data: string;
};

export async function putMe(request: putMeRequest) {
  const response: putMeResponse = await apiInstance.put(MEMBERS.me, { ...request });
  console.log(response);
}
