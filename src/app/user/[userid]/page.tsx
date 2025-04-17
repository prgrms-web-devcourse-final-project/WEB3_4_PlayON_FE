'use client';

import PopularCard from '@/components/game/PopularCard';
import GuildHorizon from '@/components/guild/guild-horizon';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { gameSimple } from '@/types/games';
import { guild } from '@/types/guild';
import { getPartyRes } from '@/types/party';
import { dumuserGameSimple } from '@/utils/dummyData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import SteamSVG from '@/components/svg/steam';
import Tag from '@/components/common/Tag';
import { useMembers } from '@/api/members';
import { userDetail } from '@/types/user';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
import { PATH } from '@/constants/routes';
import CustomPagination from '@/components/common/CustomPagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function UserInfoPage() {
  const dumuserGameArr = new Array<gameSimple>(8).fill(dumuserGameSimple);

  const [api, setApi] = useState<CarouselApi>();

  const memberApi = useMembers();
  const [userInfo, SetUserInfo] = useState<userDetail | null>(null);
  const [userGuilds, setuserGuilds] = useState<guild[] | null>([]);
  const [userParties, setuserParties] = useState<getPartyRes[] | null>([]);
  const [userPartyLogs, setuserPartyLogs] = useState<getPartyRes[] | null>([]);

  const params = useParams();
  const userid = Number(params?.userid) as number;

  console.log('targetUserid', userid);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();

  const PAGE_SIZE = 6;
  const totalItems = userPartyLogs?.length;

  useEffect(() => {
    const GetMe = async () => {
      try {
        const res = await memberApi.GetUserDetail(userid);
        console.log('응답 Me', res);
        SetUserInfo(res);
        console.log('userInfo', userInfo);
      } catch (error: any) {
        console.log('에러 발생', error.response);
      }
    };
    GetMe();

    const userGuilds = async () => {
      try {
        const res = await memberApi.UserGuilds(userid);

        console.log('userguilds 응답', res);

        setuserGuilds(res);
        console.log('상태 응답', userGuilds);
      } catch (error: any) {
        console.log('에러 발생', error.response);
      }
    };
    userGuilds();

    const GetuserParties = async () => {
      try {
        const res = await memberApi.GetUserParties(userid);
        console.log('너의 파티응답', res);
        setuserParties(res);
      } catch (error: any) {
        console.log('에러 발생 파티1', error);
      }
    };
    GetuserParties();

    const GetuserPartyLogs = async () => {
      const data = {
        page: 1,
        pageSize: 18,
      };

      try {
        const res = await memberApi.GetUserPartyLogs(userid, { ...data });
        console.log('페이지 단 파티로그응답', res);
        setuserPartyLogs(res);
      } catch (error: any) {
        console.log('에러 발생 파티', error);
      }
    };
    GetuserPartyLogs();
  }, []);
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const pageNum = parseInt(pageParam);
      setCurrentPage(isNaN(pageNum) ? 1 : pageNum);
    }
  }, [searchParams]);

  const paginatedLogs = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    //   return dumuserPartyLogList?.slice(startIdx, startIdx + PAGE_SIZE);
    // }, [dumuserPartyLogList, currentPage]);
    return userPartyLogs?.slice(startIdx, startIdx + PAGE_SIZE);
  }, [userPartyLogs, currentPage]);
  // if (!userInfo) return <div className="text-center pt-28">로딩 중...</div>;

  // const defauiltAvatar = '/img/_defilmmopruy.jpg';
  const defauiltAvatar = '/img/dumuser_profile.jpg';

  const router = useRouter();
  // const member = useMembers();
  // const { setUser } = useAuthStore();

  return (
    <main>
      <section className="wrapper pt-36 pb-16">
        <div className="flex flex-col gap-16">
          <div className="w-full px-8 py-9 border border-neutral-300 rounded-2xl">
            {/* 유저 정보 */}
            {userInfo ? (
              <div className="flex gap-7 relative">
                <Avatar className="bg-neutral-400 w-24 h-24">
                  {/* <AvatarImage src={ (userInfo.img_src ? (userInfo.img_src) : (defauiltAvatar) )}  /> */}
                  <AvatarImage className="object-cover" src={userInfo.img_src || defauiltAvatar} />
                </Avatar>

                <div>
                  <div className="flex gap-3">
                    {/* <p className="font-suit text-2xl font-semibold text-neutral-400">{userInfo.user_title}</p> */}
                    <p className="font-suit text-2xl font-bold ">{userInfo.nickname}</p>
                  </div>

                  <div className="flex gap-8">
                    <div className="font-suit text-base font-semibold text-neutral-400 flex">
                      스팀 아이디 :&nbsp;&nbsp;&nbsp;
                      {userInfo.steam_id ? (
                        <div>{userInfo.steam_id}</div>
                      ) : (
                        // <div>{userInfo.steam_id.split('@')[0]}</div>
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                              <div className="flex flex-row gap-1 items-center">
                                <SteamSVG fill={'#8258ff'} stroke="" width={16} height={16} />
                                <p className="text-base font-black text-purple-400">STEAM</p>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="font-dgm text-sm py-[6px] px-2 leading-4 font-normal">
                                STEAM 미연동 유저입니다.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p className="font-suit text-base font-semibold text-neutral-400"> 성별 : {userInfo.gender}</p>
                  </div>

                  <div className="gap-5">
                    <p className="font-suit text-2xl font-bold pt-8">{userInfo.nickname} 님의 플레이 스타일</p>

                    <div className="flex flex-col rounded-xl gap-2 py-6">
                      <div className="flex items-center gap-2">
                        <p className="w-[118px] font-dgm text-neutral-900">플레이 스타일</p>
                        <div className="flex gap-2">
                          <Tag style="retro" size="small" background="dark">
                            {userInfo.party_style}
                          </Tag>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <p className="w-[118px] font-dgm text-neutral-900">게임 실력</p>
                        <Tag style="retro" size="small" background="dark">
                          {userInfo.skill_level}
                        </Tag>
                      </div>
                      <div className="flex gap-2">
                        <p className="w-[118px] font-dgm text-neutral-900">성별</p>
                        <Tag style="retro" size="small" background="dark">
                          {userInfo.gender}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-1 right-0">
                  <div className="w-full"></div>
                </div>
              </div>
            ) : (
              <p>유저를 불러오는중</p>
            )}
          </div>

          {/* 너의 길드 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">{userInfo?.nickname}의 길드</p>

            <div className="flex flex-col-3 gap-6 relative">
              <div className="rounded-xl" onPointerDownCapture={(e) => e.stopPropagation}>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: false,
                  }}
                  orientation="horizontal"
                  className="w-full "
                  setApi={setApi}
                >
                  <CarouselContent className="select-none">
                    {dumuserGameArr.map((_, ind) => {
                      return (
                        <CarouselItem key={ind} className={``}>
                          <div className="grid grid-cols-3 gap-6">
                            {userGuilds?.map((guild) => <GuildHorizon key={guild.guild_name} data={guild} />)}
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              </div>

              <div className="absolute top-40 -left-7">
                <button
                  className="h-12 w-12 bg-white flex items-center justify-center rounded-full border border-neutral-200
                   hover:bg-neutral-200 transition-colors
                   "
                  onClick={() => {
                    console.log(api?.canScrollPrev());
                    if (api?.canScrollPrev()) api.scrollPrev();
                  }}
                >
                  <ChevronLeft className="text-black" />
                </button>
              </div>

              <div className="absolute top-40 -right-7">
                <button
                  className="h-12 w-12 bg-white flex items-center justify-center rounded-full border border-neutral-200
                  hover:bg-neutral-200 transition-colors
                  "
                  onClick={() => {
                    console.log(api?.canScrollNext());
                    if (api?.canScrollNext()) api.scrollNext();
                  }}
                >
                  <ChevronRight className="text-black" />
                </button>
              </div>
            </div>
            {userGuilds?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" noText={true}>
                  <RetroButton
                    type="purple"
                    className="mt-4"
                    callback={() => {
                      router.push(PATH.guild_list);
                    }}
                  >
                    길드 가입 하러 가기!
                  </RetroButton>
                </EmptyLottie>
              </div>
            )}
          </div>

          {/* 내가 보유한 게임 목록 */}
          {/* <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">내가 보유한 게임 목록</p>
            <div className="flex gap-6">
              {userGames?.map((data) => <PopularCard key={data.appid} data={data.gameData} />)}
              <PopularCard data={dumuserGameSimple} />
              <PopularCard data={dumuserGameSimple} />
              <PopularCard data={dumuserGameSimple} />
            </div>
          </div> */}

          {/* 너가 참여중인 파티 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">참여중인 파티</p>
            <div className="flex">
              <div className="grid grid-cols-3 gap-6">
                {userParties?.map((party) => <PartyCard key={party.partyId} data={party} />)}
              </div>
            </div>
            {userParties?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" noText={true}>
                  <RetroButton
                    type="purple"
                    className="mt-4"
                    callback={() => {
                      router.push(PATH.party_list);
                    }}
                  >
                    파티 하러 가기!
                  </RetroButton>
                </EmptyLottie>
              </div>
            )}
          </div>

          {/* 너가 참여한 파티 로그 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">참여한 파티 로그</p>

            <div className="grid grid-cols-3 gap-6">
              {paginatedLogs?.map((partyLog) => <PartyLogCard key={partyLog.partyId} data={partyLog} />)}

              {/* {paginatedLogs?.map((partyLog) => (
                            <PartyLogCard key={partyLog.party_info.party_name} data={partyLog} />
                          ))} */}
            </div>

            {userPartyLogs?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" noText={true}>
                  <RetroButton
                    type="purple"
                    className="mt-4"
                    callback={() => {
                      router.push(PATH.party_list);
                    }}
                  >
                    파티 하러 가기!
                  </RetroButton>
                </EmptyLottie>
              </div>
            )}

            {userPartyLogs?.length !== 0 && (
              // {/* {totalItems > PAGE_SIZE && ( */}
              <div className="mt-10">
                <CustomPagination totalItems={totalItems} pageSize={PAGE_SIZE} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
