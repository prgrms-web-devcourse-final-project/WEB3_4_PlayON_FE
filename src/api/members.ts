import { Tag } from '@/components/common/Tag';
import { useAxios } from '@/hooks/useAxios';
import { MEMBER_ENDPOINTS as MEMBER } from '@/constants/endpoints/member';
import { userDetail } from '@/types/user';
import typeConverter from '@/utils/typeConverter';
import { STEAM_AUTH_ENDPOINTS } from '@/constants/endpoints/steam-auth';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { getSteamImage } from './steamImg';
import { gameSimple } from '@/types/games';
import { guild } from '@/types/guild';
import categorizeTags from '@/utils/categorizeTags';

export const useMembers = () => {
  const axios = useAxios();
  const { user, setUser, setMemberId } = useAuthStore();
  const { toast } = useToast();

  // 내 정보
  async function GetMe() {
    const response = await axios.Get(MEMBER.me, { headers: { 'Content-Type': 'application/json' } }, false);
    if (!response) return undefined;
    const data = response.data.data;
    setMemberId(data.memberDetail.memberId);

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

  async function GetMeGames() {
    const response = await axios.Get(MEMBER.me, {}, false);
    if (!response) return undefined;
    const data = response.data.data;
    console.log(data);

    const ret: { gameData: gameSimple; appid: number }[] = data.ownedGames.map((e) => ({
      gameData: {
        title: e.name,
        genre: e.genres,
        img_src: e.headerImage,
        background_src: '',
      },
      appid: e.appid,
    }));
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

  // 내 프로필 이미지 저장
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

  // 회원 탈퇴
  async function DeleteMe() {
    const response = await axios.Delete(MEMBER.me, { headers: { 'Content-Type': 'application/json' } }, true);
    return response;
  }

  // 나의 보유 게임 조회
  async function MyGames(count?: number): Promise<{ gameData: gameSimple[]; appid: number }> {
    const response = await axios.Get(
      MEMBER.games,
      {
        params: { count },
        headers: { 'Content-Type': 'application/json' },
      },
      true
    );
    if (response && response.status === 200) {
      const data = response.data.data;
      return data.map((e) => ({
        gameData: {
          title: e.name as string,
          genre: e.genres as string[],
          img_src: e.headerImage as string,
          background_src: '',
          appid: e.appid as number,
        },
      }));
    }
    throw new Error('Failed to fetch myGames');
  }

  // 나의 가입 길드 조회
  async function MyGuilds(count?: number): Promise<{ guilddata: guild[]; appid: number }> {
    const response = await axios.Get(
      MEMBER.guilds,
      { params: { count }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (response && response.status === 200) {
      const data = response.data.data;
      return data.map((e) => {
        const tags = categorizeTags(e.tags);
        return {
          img_src: e.guildImg as string,
          guild_name: e.name as string,
          description: e.description as string[],
          num_members: e.memberCount as number,
          guild_id: e.guildId as number,
          // tagsArr: e.tags as string[],
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
    }
    throw new Error('Failed to fetch myGuilds');
  }

  async function testParty() {
    try {
      const response = await axios.Get(
        MEMBER.myParties,
        {
          headers: { 'Content-Type': 'application/json' },
        },
        true
      );
      console.log('테스트 파티 응답', response);
      console.log('테스트 파티 응답2', response.data.data.parties);
      return response.data;
    } catch (error: any) {
      console.log('테스트 파티 에러', error.response);
    }
  }

  // 나의 참여중인 파티 조회
  async function GetMyParties() {
    try {
      const response = await axios.Get(MEMBER.myParties, { headers: { 'Content-Type': 'application/json' } }, true);

      if (response && response.status === 200) {
        const data = response.data.data.parties;
        return data.map((data) => {
          return {
            appId: data.appId,
            partyId: data.partyId,
            name: data.name,
            description: data.description,
            partyAt: data.partyAt,
            // end_time: data.endedAt,
            gameName: data.gameName,
            partyTags: data.partyTags.map((tag) => ({
              tagValue: tag.tagValue,
            })),
            members: data.members.map((e) => ({
              memberId: e.memberId,
              profileImg: e.profileImg,
            })),

            selected_game: {
              title: data.gameName,
              genre: [],
              img_src: getSteamImage(1, 'header'),
              background_src: getSteamImage(1, 'background'),
              // img_src: await getSteamImage(party.appId, 'header'),
              // background_src: await getSteamImage(party.appId, 'background'),
            },
            // maximum: 10,
            // num_minimum: 2,
            maximum: data.maximum,
            num_minimum: data.minimum,
          };
        });
      }
    } catch (error: any) {
      console.log('파티 에러', error);
      throw error;
      // throw new Error('Failed to fetch myGames');
      // return false;
    }
  }

  // 나의 파티 로그 조회
  async function GetMyPartyLogs(data: { page?: number; pageNumber?: number }) {
    const response = await axios.Get(
      MEMBER.myPartyLogs,
      {
        params: { ...data },
      },
      true
    );

    if (response && response.status === 200) {
      const data = response.data.data;
      return data.items.map((data) => {
        return {
          appId: data.appId,
          partyId: data.partyId,
          name: data.name,
          description: data.description,
          total: data.total,
          partyAt: data.partyAt,
          // end_time: data.endedAt,
          gameName: data.gameName,
          partyTags: data.partyTags.map((tag) => ({
            tagValue: tag.tagValue,
          })),
          members: data.members.map((e) => ({
            memberId: e.memberId,
            profileImg: e.profileImg,
          })),

          selected_game: {
            title: data.gameName,
            genre: [],
            img_src: getSteamImage(1, 'header'),
            background_src: getSteamImage(1, 'background'),
            // img_src: await getSteamImage(party.appId, 'header'),
            // background_src: await getSteamImage(party.appId, 'background'),
          },
          maximum: data.maximum,
          num_minimum: data.minimum,
        };
      });
    }
    return false;
  }

  // 파티 초대 승낙
  async function AcceptPartyInvite(partyId: number) {
    const response = await axios.Put(MEMBER.partyAccept(partyId), {}, {}, true);
    if (!response || response.status !== 200) {
      return true;
    }
    return false;
  }
  // 파티 초대 거절
  async function DeclinePartyInvite(partyId: number) {
    const response = await axios.Delete(MEMBER.partyDecline(partyId), {}, true);
    if (!response || response.status !== 200) {
      return true;
    }
    return false;
  }

  // 파티 신청 취소
  async function CancelPartyInvite(partyId: number) {
    const response = await axios.Delete(MEMBER.partyInviteCancel(partyId), {}, true);
    if (response && response.status === 200) {
      return true;
    }
    return false;
  }

  // 일반 회원가입
  async function Signup(username: string, password: string) {
    const response = await axios.Post(
      MEMBER.signup,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } },
      false
    );
    if (!response || response.status !== 200) {
      return false;
    }
    return true;
  }

  // 일반 회원 로그인
  async function login(username: string, password: string) {
    const response = await axios.Post(
      MEMBER.login,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (!response || response.status !== 200) {
      toast({
        title: '이런! 로그인 중에 문제가 발생했습니다',
        description: '아이디와 비밀번호를 확인해주세요',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }

  // 스팀 로그아웃
  async function logout() {
    setUser(undefined);
    setMemberId(undefined);
    const response = await axios.Post(STEAM_AUTH_ENDPOINTS.logout, {}, {}, true);
    if (response && response.status === 204) {
      toast({ title: '로그아웃 되셨습니다', description: '내일 봐!', variant: 'primary' });
      return true;
    }
    return false;
  }

  // 닉네임으로 회원 명단 조회
  async function SearchByNickname(nickname: string) {
    const response = await axios.Get(MEMBER.nickname, { params: { nickname } }, true);
    if (response && response.status === 200) {
      const data = response.data.data;
      return data;
    }
    throw new Error('Failed to search users with nickname');
  }

  // 다른 회원 정보
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

  // 다른 회원의 참여중인 파티 조회
  async function GetUserParties(userId: number) {
    try {
      const response = await axios.Get(
        MEMBER.userParties(userId),
        { headers: { 'Content-Type': 'application/json' } },
        true
      );

      if (response && response.status === 200) {
        const data = response.data.data.parties;
        return data.map((data) => {
          return {
            appId: data.appId,
            partyId: data.partyId,
            name: data.name,
            description: data.description,
            partyAt: data.partyAt,
            // end_time: data.endedAt,
            gameName: data.gameName,
            partyTags: data.partyTags.map((tag) => ({
              tagValue: tag.tagValue,
            })),
            members: data.members.map((e) => ({
              memberId: e.memberId,
              profileImg: e.profileImg,
            })),

            selected_game: {
              title: data.gameName,
              genre: [],
              img_src: getSteamImage(1, 'header'),
              background_src: getSteamImage(1, 'background'),
              // img_src: await getSteamImage(party.appId, 'header'),
              // background_src: await getSteamImage(party.appId, 'background'),
            },
            // maximum: 10,
            // num_minimum: 2,
            maximum: data.maximum,
            num_minimum: data.minimum,
          };
        });
      }
    } catch (error: any) {
      console.log('파티 에러', error);
      throw error;
      // throw new Error('Failed to fetch myGames');
      // return false;
    }
  }

  // 다른 회원의 파티 로그 조회
  async function GetUserPartyLogs(
    userId: number,
    data: {
      page?: number,
      pageNumber?: number
    }
  ) {

    const response = await axios.Get(
      MEMBER.userPartyLogs(userId),
      {
        params: { ...data },
      },
      true
    );
    
    if (response && response.status === 200) {
      const data = response.data.data;
      return data.items.map((data) => {
        return {
          appId: data.appId,
          partyId: data.partyId,
          name: data.name,
          description: data.description,
          total: data.total,
          partyAt: data.partyAt,
          // end_time: data.endedAt,
          gameName: data.gameName,
          partyTags: data.partyTags.map((tag) => ({
            tagValue: tag.tagValue,
          })),
          members: data.members.map((e) => ({
            memberId: e.memberId,
            profileImg: e.profileImg,
          })),

          selected_game: {
            title: data.gameName,
            genre: [],
            img_src: getSteamImage(1, 'header'),
            background_src: getSteamImage(1, 'background'),
            // img_src: await getSteamImage(party.appId, 'header'),
            // background_src: await getSteamImage(party.appId, 'background'),
          },
          maximum: data.maximum,
          num_minimum: data.minimum,
        };
      });
    }
    return false;
  }

  // 특정 유저 가입 길드 조회
  async function UserGuilds(userId: number, count?: number): Promise<{ guilddata: guild[]; appid: number }> {
    const response = await axios.Get(
      MEMBER.userguilds(userId),
      { params: { count }, headers: { 'Content-Type': 'application/json' } },
      true
    );
    if (response && response.status === 200) {
      const data = response.data.data;
      return data.map((e) => {
        const tags = categorizeTags(e.tags);
        return {
          img_src: e.guildImg as string,
          guild_name: e.name as string,
          description: e.description as string[],
          num_members: e.memberCount as number,
          guild_id: e.guildId as number,
          // tagsArr: e.tags as string[],
          play_style: tags.play_style,
          skill_level: tags.skill_level,
          gender: tags.gender,
          friendly: tags.friendly,
        };
      });
    }
    throw new Error('Failed to fetch myGuilds');
  }
  async function steamAuthSignup() {
    const response = await axios.Get(STEAM_AUTH_ENDPOINTS.signup, {}, true);
    const redirectUrl = response?.data.data.redirectUrl;
    return redirectUrl;
  }

  // 스팀 회원가입 리다이렉트
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
    GetMeGames,
    MyGuilds,
    UserGuilds,
    testParty,
  };
};
