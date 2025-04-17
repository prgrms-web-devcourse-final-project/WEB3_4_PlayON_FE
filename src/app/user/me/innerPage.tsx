'use client';

import PopularCard from '@/components/game/PopularCard';
import GuildHorizon from '@/components/guild/guild-horizon';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guild } from '@/types/guild';
import { getPartyRes, partyLog } from '@/types/party';
import { ChevronLeft, ChevronRight, SquarePen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import SteamSVG from '@/components/svg/steam';
import Tag from '@/components/common/Tag';
import { useMembers } from '@/api/members';
import { userDetail } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
import { PATH } from '@/constants/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import styles from './myPage.module.css';
import { useAuthStore } from '@/stores/authStore';
import { useAlertStore } from '@/stores/alertStore';

interface resGameProps {
  gameData: {
    title: string;
    genre: string[];
    img_src: string;
    background_src: '';
    appid: number;
  };
}

export default function InnerPage() {
  const memberApi = useMembers();
  const [userMe, SetUserMe] = useState<userDetail | null>(null);
  const [myGames, setMyGames] = useState<resGameProps[] | null>([]);
  const [myGuilds, setMyGuilds] = useState<guild[] | null>([]);
  const [myParties, setMyParties] = useState<getPartyRes[] | null>([]);
  const [myPartyLogs, setMyPartyLogs] = useState<partyLog[] | null>([]);
  // const [totalItems, setTotalItems] = useState(0);

  const { user, hasHydrated } = useAuthStore();
  const { showAlert } = useAlertStore();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) return;
    const GetMe = async () => {
      try {
        const res = await memberApi.GetMe();
        console.log('응답 Me', res);
        SetUserMe(res);
        console.log('userMe', userMe);
      } catch (error: any) {
        console.log('에러 발생', error.response);
      }
    };
    GetMe();

    const MyGames = async () => {
      const count = 12;
      try {
        const res = await memberApi.MyGames(count);

        console.log('mygame 응답', res);

        setMyGames(res);
        // console.log('상태 응답', myGames);
      } catch (error: any) {
        console.log('에러 발생', error.response);
      }
    };

    const MyGuilds = async () => {
      if (!user) return;
      try {
        const res = await memberApi.MyGuilds();

        console.log('myguilds 응답', res);

        setMyGuilds(res);
        // console.log('상태 응답', myGames);
      } catch (error: any) {
        console.log('에러 발생', error.response);
      }
    };

    const GetMyParties = async () => {
      if (!user) return;
      try {
        const res = await memberApi.GetMyParties();
        // console.log('파티응답', res);
        setMyParties(res);
      } catch (error: any) {
        console.log('에러 발생 파티1', error);
      }
    };

    const GetMyPartyLogs = async () => {
      if (!user) return;
      const data = {
        page: 1,
        pageSize: 18,
      };

      try {
        const res = await memberApi.GetMyPartyLogs({ ...data });
        // console.log('페이지 단 파티로그응답', res);
        setMyPartyLogs(res);
      } catch (error: any) {
        console.log('에러 발생 파티', error);
      }
    };
    // if (userMe) {
    // GetMe();
    MyGames();
    MyGuilds();
    GetMyParties();
    GetMyPartyLogs();
    // }
  }, [user, hasHydrated]);

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const pageNum = parseInt(pageParam);
      setCurrentPage(isNaN(pageNum) ? 1 : pageNum);
    }
  }, [searchParams]);

  const defaultAvatar = '/img/dummy_profile.jpg';

  const router = useRouter();
  const member = useMembers();

  async function steamAuth() {
    const response = await member.steamAuthLink();
    window.location.href = response;
  }

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    if (user) return;
    showAlert(
      '로그인 후 이용할 수 있습니다.',
      '로그인 페이지로 갈까요?',
      () => {
        router.push(PATH.login);
      },
      () => {
        router.back();
      }
    );
  }, [user, hasHydrated]);
  return (
    <main>
      {user && (
        <section className="wrapper pt-36 pb-16">
          <div className="flex flex-col gap-16">
            {/* 나의 정보 */}
            <div className="w-full px-8 py-9 border border-neutral-300 rounded-2xl">
              {userMe ? (
                <div className="flex gap-7 relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage className="object-cover" src={userMe.img_src || defaultAvatar} />
                  </Avatar>

                  <div>
                    <div className="flex gap-3">
                      <p className="font-suit text-2xl font-bold ">{userMe.nickname}</p>
                    </div>

                    <div className="flex gap-8">
                      <div className="font-suit text-base font-semibold text-neutral-400 flex">
                        스팀 아이디 :&nbsp;&nbsp;&nbsp;
                        {userMe.steam_id ? (
                          <div>{userMe.steam_id}</div>
                        ) : (
                          // <div>{userMe.steam_id.split('@')[0]}</div>
                          <TooltipProvider>
                            <Tooltip delayDuration={0}>
                              <TooltipTrigger>
                                <button className="flex flex-row gap-1 items-center" onClick={() => steamAuth()}>
                                  <SteamSVG fill={'#8258ff'} stroke="" width={16} height={16} />
                                  <p className="font-suit text-base font-black text-purple-400">STEAM</p>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p className="font-dgm text-sm py-[6px] px-2 leading-4 font-normal">
                                  Steam 연동 페이지로 이동합니다.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <div></div>
                      </div>
                      <p className="font-suit text-base font-semibold text-neutral-400"> 성별 : {userMe.gender}</p>
                    </div>

                    <div className="gap-5">
                      <p className="font-suit text-2xl font-bold pt-8">{userMe.nickname} 님의 플레이 스타일</p>

                      <div className="flex flex-col rounded-xl gap-2 py-6">
                        <div className="flex items-center gap-2">
                          <p className="w-[118px] font-dgm text-neutral-900">플레이 스타일</p>
                          <div className="flex gap-2">
                            <Tag style="retro" size="small" background="dark">
                              {userMe.party_style}
                            </Tag>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <p className="w-[118px] font-dgm text-neutral-900">게임 실력</p>
                          <Tag style="retro" size="small" background="dark">
                            {userMe.skill_level}
                          </Tag>
                        </div>
                        <div className="flex gap-2">
                          <p className="w-[118px] font-dgm text-neutral-900">성별</p>
                          <Tag style="retro" size="small" background="dark">
                            {userMe.gender}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-1 right-0">
                    <div className="w-full">
                      {/* <EditInfo /> */}

                      <Link href="/user/me/modify">
                        <SquarePen color="#A3A3A3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <p>유저를 불러오는중</p>
              )}
            </div>

            {/* 나의 길드 */}
            <div className="flex flex-col gap-6">
              <p className="font-suit text-3xl font-semibold">나의 길드</p>
              {myGuilds && (
                <div className="flex flex-col-3 gap-6 relative">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="horizontal"
                    mousewheel={true}
                    modules={[Pagination, Navigation]}
                    style={{ width: '100%', height: 'auto' }}
                    navigation={{
                      nextEl: `.${styles.guildButtonNext}`,
                      prevEl: `.${styles.guildButtonPrev}`,
                    }}
                  >
                    {myGuilds.slice(0, 10).map((data, index) => (
                      <SwiperSlide key={index}>
                        <GuildHorizon data={data} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.guildButtonPrev} absolute rounded-full -left-5 top-1/2 z-10`}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.guildButtonNext} absolute rounded-full -right-5 top-1/2 z-10`}
                >
                  <ChevronRight />
                </Button> */}
                </div>
              )}
              {myGuilds?.length === 0 && (
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
            <div className="flex flex-col gap-6">
              <p className="font-suit text-3xl font-semibold">내가 보유한 게임 목록</p>
              {myGames && (
                <div className="flex flex-col-3 gap-6 relative">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="horizontal"
                    mousewheel={true}
                    modules={[Pagination, Navigation]}
                    style={{ width: '100%', height: 'auto' }}
                    navigation={{
                      nextEl: `.${styles.gameButtonNext}`,
                      prevEl: `.${styles.gameButtonPrev}`,
                    }}
                  >
                    {myGames.slice(0, 10).map((data, index) => (
                      <SwiperSlide key={index}>
                        <PopularCard data={data.gameData} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.gameButtonPrev} absolute rounded-full -left-5 top-1/3 z-10`}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.gameButtonNext} absolute rounded-full -right-5 top-1/3 z-10`}
                >
                  <ChevronRight />
                </Button> */}
                </div>
              )}

              {myGames?.length === 0 && (
                <div className="text-center">
                  <EmptyLottie className="w-[280px] mt-6" text="보유한 게임이 없어요"></EmptyLottie>
                </div>
              )}
            </div>

            {/* 참여중인 파티 */}
            <div className="flex flex-col gap-6">
              <p className="font-suit text-3xl font-semibold">참여중인 파티</p>
              {myParties && (
                <div className="flex flex-col-3 gap-6 relative">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="horizontal"
                    mousewheel={true}
                    modules={[Pagination, Navigation]}
                    style={{ width: '100%', height: 'auto' }}
                    navigation={{
                      nextEl: `.${styles.partyButtonNext}`,
                      prevEl: `.${styles.partyButtonPrev}`,
                    }}
                  >
                    {myParties.slice(0, 10).map((data, index) => (
                      <SwiperSlide key={index}>
                        <PartyCard data={data} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.partyButtonPrev} absolute rounded-full -left-5 top-1/2 z-10`}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.partyButtonNext} absolute rounded-full -right-5 top-1/2 z-10`}
                >
                  <ChevronRight />
                </Button> */}
                </div>
              )}

              {myParties?.length === 0 && (
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

            {/* 참여한 파티 로그 */}
            <div className="flex flex-col gap-6">
              <p className="font-suit text-3xl font-semibold">참여한 파티 로그</p>

              {myPartyLogs && (
                <div className="flex flex-col-3 gap-6 relative">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    direction="horizontal"
                    mousewheel={true}
                    modules={[Pagination, Navigation]}
                    style={{ width: '100%', height: 'auto' }}
                    navigation={{
                      nextEl: `.${styles.partyLogButtonPrev}`,
                      prevEl: `.${styles.partyLogButtonNext}`,
                    }}
                  >
                    {myPartyLogs.slice(0, 10).map((data, index) => (
                      <SwiperSlide key={index}>
                        <PartyLogCard data={data} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.partyLogButtonPrev} absolute rounded-full -right-5 top-1/2 z-20`}
                >
                  <ChevronRight />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.partyLogButtonNext} absolute rounded-full -right-5 top-1/2 z-20`}
                >
                  <ChevronRight />
                </Button> */}
                </div>
              )}

              {myPartyLogs?.length === 0 && (
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
          </div>
        </section>
      )}
    </main>
  );
}
