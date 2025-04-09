import { useAxios } from '@/hooks/useAxios';
import { MEMBER_ENDPOINTS as MEMBER } from '@/constants/endpoints/member';
import { userDetail } from '@/types/user';
import typeConverter from '@/utils/typeConverter';
import { STEAM_AUTH_ENDPOINTS } from '@/constants/endpoints/steam-auth';

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
      gender: typeConverter('userGender', 'EnToKo', data.memberDetail.gender),
      nickname: data.memberDetail.nickname,
      img_src: data.memberDetail.profileImg,
      party_style: typeConverter('playStyle', 'EnToKo', data.memberDetail.playStyle),
      skill_level: typeConverter('skillLevel', 'EnToKo', data.memberDetail.skillLevel),
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
    const response = await axios.Get(MEMBER.nickname, { params: { nickname } }, true);
    return response;
  }
  async function MyGames(count?: number) {
    const response = await axios.Delete(
      MEMBER.games,
      { params: { count }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    return response;
  }
  async function steamAuthSignup() {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.signup, {}, true);
    const redirectUrl = response?.data.data.redirectUrl;
    return redirectUrl;
  }
  async function steamAuthSignupCallback(callbackParam: string) {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.callback_signup, { params: JSON.parse(callbackParam) }, true);
    return response;
  }
  async function steamAuthLogin() {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.login, {}, true);
    const redirectUrl = response?.data.data.redirectUrl;
    return redirectUrl;
  }
  async function steamAuthLoginCallback(callbackParam: string) {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.callback_login, { params: JSON.parse(callbackParam) }, true);
    return response;
  }
  async function steamAuthLink() {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.link, {}, true);
    const redirectUrl = response?.data.data.redirectUrl;
    return redirectUrl;
  }
  async function steamAuthLinkCallback(callbackParam: string) {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.callback_link, { params: JSON.parse(callbackParam) }, true);
    return response;
  }
  //보유게임 목록 갱신
  async function steamLink() {
    const response = await axios.Post(MEMBER_ENDPOINTS.steamLinks, {}, true);
    return response;
  }

  return {
    login,
    Signup,
    GetMe,
    PutMe,
    DeleteMe,
    SearchByNickname,
    MyGames,
    steamAuthSignup,
    steamAuthSignupCallback,
    steamAuthLogin,
    steamAuthLoginCallback,
    steamAuthLink,
    steamAuthLinkCallback,
    steamLink,
  };
};
