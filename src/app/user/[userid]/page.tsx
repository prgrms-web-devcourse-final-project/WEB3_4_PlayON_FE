'use client';

import GuildHorizon from '@/components/guild/guild-horizon';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { guild } from '@/types/guild';
import { getPartyRes } from '@/types/party';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import SteamSVG from '@/components/svg/steam';
import Tag from '@/components/common/Tag';
import { useMembers } from '@/api/members';
import { userDetail } from '@/types/user';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import EmptyLottie from '@/components/common/EmptyLottie';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import styles from '../me/myPage.module.css';

export default function UserInfoPage() {
  const memberApi = useMembers();
  const [userInfo, SetUserInfo] = useState<userDetail | null>(null);
  const [userGuilds, setuserGuilds] = useState<guild[] | null>([]);
  const [userParties, setuserParties] = useState<getPartyRes[] | null>([]);
  const [userPartyLogs, setuserPartyLogs] = useState<getPartyRes[] | null>([]);

  const params = useParams();
  const userid = Number(params?.userid) as number;

  console.log('targetUserid', userid);

  const searchParams = useSearchParams();

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

  const defaultAvatar = '/img/dummy_profile.jpg';

  const router = useRouter();

  return (
    <main>
      <section className="wrapper pt-36 pb-16">
        <div className="flex flex-col gap-16">
          <div className="w-full px-8 py-9 border border-neutral-300 rounded-2xl">
            {/* 유저 정보 */}
            {userInfo ? (
              <div className="flex gap-7 relative">
                <Avatar className="bg-neutral-400 w-24 h-24">
                  <AvatarImage className="object-cover" src={userInfo.img_src || defaultAvatar} />
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

          {/* 나의 길드 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">{userInfo?.nickname}님의 길드</p>
            {userGuilds && (
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
                  {userGuilds.slice(0, 10).map((data, index) => (
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
            {userGuilds?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" text="가입중인 길드가 없습니다." />
              </div>
            )}
          </div>

          {/* 참여중인 파티 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">{userInfo?.nickname}님이 참여중인 파티</p>
            {userParties && (
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
                  {userParties.slice(0, 10).map((data, index) => (
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

            {userParties?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" text="참여중인 파티가 없습니다." />
              </div>
            )}
          </div>

          {/* 참여한 파티 로그 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">{userInfo?.nickname}님이 참여한 파티 로그</p>

            {userPartyLogs && (
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
                  {userPartyLogs.slice(0, 10).map((data, index) => (
                    <SwiperSlide key={index}>
                      <PartyLogCard data={data} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <Button
                  variant="outline"
                  size="icon"
                  className={`${styles.partyLogButtonPrev} absolute rounded-full -left-5 top-1/2 z-20`}
                >
                  <ChevronLeft />
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

            {userPartyLogs?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" text="참여한 파티 로그가 없습니다." />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
