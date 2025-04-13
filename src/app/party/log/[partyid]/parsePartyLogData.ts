import { party, partyReview, playerRecommend, userScreenShot } from "@/types/party";
import { userSimple } from "@/types/user";

export interface PartyLogProps {
  party_info: party;
  player_recommend: playerRecommend[];
  screenshot: userScreenShot[];
  review: partyReview[];

  partyMemberId: string;
  mvp?: userSimple;
  mvpPoint: number;
}

export function parsePartyLogData(raw: any): PartyLogProps {
  const detail = raw.data.partyDetail;
  const logs: any[] = raw.data.partyLogs?.partyLogs || [];

  // nickname => partyMemberId 매핑 객체 생성
  const nicknameToPartyMemberIdMap: Record<string, string> = {};
  detail.partyMembers.forEach((member: any) => {
    nicknameToPartyMemberIdMap[member.nickname] = member.partyMemberId;
  });

  // 시작 / 종료 시간 계산
  const startTime = new Date(detail.partyAt);
  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + detail.playTime.hour);
  endTime.setMinutes(startTime.getMinutes() + detail.playTime.minute);
  endTime.setSeconds(startTime.getSeconds() + detail.playTime.second);

  // party 타입 객체 생성
  const partyInfo: party = {
    partyId: String(detail.partyId),
    party_name: detail.name,
    description: detail.description ?? '',
    start_time: startTime,
    end_time: endTime,
    tags: detail.partyTags.map((tag: any) => tag.tagValue),
    participation: detail.partyMembers.map(
      (member: any): userSimple => ({
        memberId: member.memberId,
        username: member.username,
        nickname: member.nickname,
        img_src: member.profileImg,
        user_title: member.title,
        partyMemberId: member.partyMemberId,
      })
    ),
    selected_game: {
      title: detail.gameName,
      genre: [],
      img_src: '',
      background_src: '',
    },
    num_maximum: detail.maxParticipant,
    num_minimum: detail.minParticipant ?? undefined,
  };

  // playerRecommend 배열 파싱
  const player_recommend: playerRecommend[] = logs
    .filter((log) => log.recommendFrom && log.recommendTo)
    .map(
      (log): playerRecommend => ({
        from: {
          memberId: log.recommendFrom.memberId,
          username: log.recommendFrom.username,
          nickname: log.recommendFrom.nickname,
          img_src: log.recommendFrom.profileImg,
          user_title: log.recommendFrom.title,
        },
        to: {
          memberId: log.recommendTo.memberId,
          username: log.recommendTo.username,
          nickname: log.recommendTo.nickname,
          img_src: log.recommendTo.profileImg,
          user_title: log.recommendTo.title,
        },
      })
    );

  // 스크린샷 로그 파싱
  const screenshot: userScreenShot[] = logs
    .filter((log) => log.screenShotUrl !== undefined && log.screenShotUrl !== null)
    .map(
      (log): userScreenShot => ({
        img_src: log.screenShotUrl!,
        comment: log.comment ?? '',
        author: {
          memberId: log.nickname,
          username: log.nickname,
          nickname: log.nickname,
          img_src: log.profileImageUrl,
          user_title: '',
        },
      })
    );

  // 리뷰 로그 파싱
  const review: partyReview[] = logs
    .filter((log) => log.content)
    .map(
      (log): partyReview => ({
        text: log.content,
        author: {
          memberId: log.nickname,
          username: log.nickname,
          nickname: log.nickname,
          img_src: log.profileImageUrl,
          user_title: '',
          partyMemberId: nicknameToPartyMemberIdMap[log.nickname] ?? '',
        },
      })
    );

  const partyMemberId = String(detail.partyMembers[0]?.partyMemberId ?? '');

  const mvp = {
    username: detail.partyMembers.username,
    nickname: detail.mvpName,
    user_title: detail.partyMembers.title,
    img_src: detail.mvpProfileImg,
    memberId: detail.partyMembers.memberId,
  };
  const mvpPoint = detail.mvpPoint ?? 0;

  return {
    party_info: partyInfo,
    player_recommend,
    screenshot,
    review,

    partyMemberId,
    mvp,
    mvpPoint,
  };
}