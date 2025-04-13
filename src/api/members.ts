import { useAxios } from '@/hooks/useAxios';
import { MEMBER_ENDPOINTS as MEMBER } from '@/constants/endpoints/member';
import { userDetail } from '@/types/user';
import typeConverter from '@/utils/typeConverter';
import { STEAM_AUTH_ENDPOINTS } from '@/constants/endpoints/steam-auth';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { getSteamImage } from './steamImg';

export const useMembers = () => {
  const axios = useAxios();
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();

  async function GetMe() {
    const response = await axios.Get(MEMBER.me, {}, false);
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
    // console.log(data);
    return ret;
  }
  async function PutMe(
    nickname: string,
    updateProfileImg: boolean,
    newFileType: string,
    playStyle: string,
    skillLevel: string,
    gender: string
  ) {
    const response = await axios.Put(
      MEMBER.me,
      { nickname, updateProfileImg, newFileType, playStyle, skillLevel, gender },
      {},
      true
    );
    if (!response || response.status !== 200) {
      return { success: false, error: response?.status };
    }
    return {
      success: true,
      presignedUrl: response.data.data.presignedUrl,
    };
  }
  async function profileImg(url: string) {
    const response = await axios.Post(
      MEMBER.profileImg,
      { url },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (response && response.status === 200 && user) {
      setUser({ ...user, img_src: url });
      return true;
    }
    return false;
  }
  async function DeleteMe() {
    const response = await axios.Delete(MEMBER.me, { headers: { 'Content-Type': 'application/json' } }, true);
    return response;
  }

  async function GetMyParties() {
    const response = await axios.Get(MEMBER.myParties, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        partyId: data.partyId,
        party_name: data.name,
        description: data.description,
        start_time: data.partyAt,
        end_time: data.endedAt,
        tags: data.partyTags.map((tag) => tag.tagValue),
        participation: data.partyMembers,
        selected_game: {
          title: data.gameName,
          genre: [],
          img_src: await getSteamImage(1, 'header'),
          background_src: await getSteamImage(1, 'background'),
          // img_src: await getSteamImage(party.appId, 'header'),
          // background_src: await getSteamImage(party.appId, 'background'),
        },
        num_maximum: 10,
        num_minimum: 2,
        // num_maximum: party.maximum,
        // num_minimum: party.minimum,
      };
    }
    return false;
  }
  async function GetMyPartyLogs() {
    const response = await axios.Get(MEMBER.myPartyLogs, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {};
    }
    return false;
  }

  async function AcceptPartyInvite(partyId: number) {
    const response = await axios.Post(MEMBER.partyAccept(partyId), {}, {}, true);
    if (!response || response.status !== 200) {
      return false;
    }
    return true;
  }
  async function DeclinePartyInvite(partyId: number) {
    const response = await axios.Delete(MEMBER.partyDecline(partyId), {}, true);
    if (!response || response.status !== 200) {
      return false;
    }
    return true;
  }
  async function CancelPartyInvite(partyId: number) {
    const response = await axios.Delete(MEMBER.partyInviteCancel(partyId), {}, true);
    if (response && response.status === 200) {
      return true;
    }
    return false;
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
  async function logout() {
    setUser(undefined);
    const response = await axios.Post(STEAM_AUTH_ENDPOINTS.logout, {}, {}, true);
    if (response && response.status === 204) {
      toast({ title: '로그아웃 되셨습니다', description: '내일 봐!', variant: 'primary' });
      return true;
    }
    return false;
  }

  async function SearchByNickname(nickname: string) {
    const response = await axios.Get(MEMBER.nickname, { params: { nickname } }, true);
    return response;
  }
  async function GetUserDetail(userId: number) {
    const response = await axios.Get(MEMBER.otherMember(userId), {}, true);
    if (response && response.status === 200) {
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
    return false;
  }
  async function GetUserParties() {
    const response = await axios.Get(MEMBER.myParties, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {
        partyId: data.partyId,
        party_name: data.name,
        description: data.description,
        start_time: data.partyAt,
        end_time: data.endedAt,
        tags: data.partyTags.map((tag) => tag.tagValue),
        participation: data.partyMembers,
        selected_game: {
          title: data.gameName,
          genre: [],
          img_src: await getSteamImage(1, 'header'),
          background_src: await getSteamImage(1, 'background'),
          // img_src: await getSteamImage(party.appId, 'header'),
          // background_src: await getSteamImage(party.appId, 'background'),
        },
        num_maximum: 10,
        num_minimum: 2,
        // num_maximum: party.maximum,
        // num_minimum: party.minimum,
      };
    }
    return false;
  }
  async function GetUserPartyLogs() {
    const response = await axios.Get(MEMBER.myPartyLogs, {}, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return {};
    }
    return false;
  }

  async function MyGames(count?: number) {
    const response = await axios.Get(
      MEMBER.games,
      { params: { count }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    console.log(response);
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
  async function steamLink() {
    const response = await axios.Post(MEMBER.steamLinks, {}, {}, true);
    console.log(response);
    if (response && response.status === 200) {
      return true;
    }
    return false;
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
    logout,
    steamLink,
    AcceptPartyInvite,
    DeclinePartyInvite,
    GetUserDetail,
    CancelPartyInvite,
    profileImg,
    GetMyParties,
    GetMyPartyLogs,
    GetUserParties,
    GetUserPartyLogs,
  };
};
