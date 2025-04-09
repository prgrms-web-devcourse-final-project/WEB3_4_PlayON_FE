import { useAxios } from '@/hooks/useAxios';
import { MEMBER_ENDPOINTS as MEMBER } from '@/constants/endpoints/member';
import { userDetail } from '@/types/user';

export const useMembers = () => {
  const axios = useAxios();

  async function login(username: string, password: string) {
    const response = await axios.Post(
      MEMBER.login,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (!response || response.status !== 200) {
      return false;
    }
    return true;
  }
  async function Signup(username: string, password: string) {
    const response = await axios.Post(
      MEMBER.signup,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (!response || response.status !== 200) {
      return false;
    }
    return true;
  }
  async function GetMe() {
    const response = await axios.Get(MEMBER.me, {}, true);
    if (!response) return undefined;
    const data = response.data.data;

    const ret: userDetail = {
      gender: data.memberDetail.gender,
      nickname: data.memberDetail.nickname,
      img_src: data.memberDetail.profileImg,
      party_style: data.memberDetail.playStyle,
      skill_level: data.memberDetail.skillLevel,
      steam_id: data.memberDetail.steamId,
      last_login_at: new Date(data.memberDetail.lastLoginAt),
      user_title: '',
      username: data.memberDetail.username,
    };
    return ret;
  }
  async function PutMe(
    nickname: string,
    profileImg: string | null,
    playStyle: string,
    skillLevel: string,
    gender: string
  ) {
    const response = await axios.Put(
      MEMBER.me,
      { nickname, profileImg, playStyle, skillLevel, gender },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (!response || response.status !== 200) return false;
    return true;
  }
  async function DeleteMe() {
    const response = await axios.Delete(MEMBER.me, { headers: { 'Content-Type': 'application/json' } }, true);
    return response;
  }
  async function SearchByNickname(nickname: string) {
    const response = await axios.Delete(
      MEMBER.nickname,
      { params: { nickname }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    return response;
  }
  async function MyGames(count: number) {
    const response = await axios.Delete(
      MEMBER.games,
      { params: { count }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    return response;
  }

  return { login, Signup, GetMe, PutMe, DeleteMe, SearchByNickname, MyGames };
};
