'use client';

import PopularCard from '@/components/game/PopularCard';
import GuildHorizon from '@/components/guild/guild-horizon';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import { gameSimple } from '@/types/games';
import { guild } from '@/types/guild';
import { getPartyRes, partyLog } from '@/types/party';
import { dummyGameSimple, dummyPartyLog } from '@/utils/dummyData';
import { ChevronLeft, ChevronRight, SquarePen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import SteamSVG from '@/components/svg/steam';
import Tag from '@/components/common/Tag';
import { useMembers } from '@/api/members';
import { userDetail } from '@/types/user';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import EmptyLottie from '@/components/common/EmptyLottie';
import RetroButton from '@/components/common/RetroButton';
import { PATH } from '@/constants/routes';
import CustomPagination from '@/components/common/CustomPagination';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
  const dummyGameArr = new Array<gameSimple>(8).fill(dummyGameSimple);

  const [api, setApi] = useState<CarouselApi>();

  const memberApi = useMembers();
  const [userMe, SetUserMe] = useState<userDetail | null>(null);
  const [myGames, setMyGames] = useState<resGameProps[] | null>([]);
  const [myGuilds, setMyGuilds] = useState<guild[] | null>([]);
  const [myParties, setMyParties] = useState<getPartyRes[] | null>([]);
  const [myPartyLogs, setMyPartyLogs] = useState<partyLog[] | null>([]);
  // const [totalItems, setTotalItems] = useState(0);

  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;
  const totalItems = myPartyLogs?.length;
  // const dummyPartyLogList: partyLog[] = Array(11).fill(dummyPartyLog);
  // const totalItems = dummyPartyLogList?.length;

  useEffect(() => {
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
      try {
        const res = await memberApi.GetMyParties();
        // console.log('파티응답', res);
        setMyParties(res);
      } catch (error: any) {
        console.log('에러 발생 파티1', error);
      }
    };

    const GetMyPartyLogs = async () => {
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
    //   return dummyPartyLogList?.slice(startIdx, startIdx + PAGE_SIZE);
    // }, [dummyPartyLogList, currentPage]);
    return myPartyLogs?.slice(startIdx, startIdx + PAGE_SIZE);
  }, [myPartyLogs, currentPage]);

  // if (!userMe) return <div className="text-center pt-28">로딩 중...</div>;

  const defauiltAvatar = '/img/dummy_profile.jpg';

  const router = useRouter();
  const member = useMembers();

  async function steamAuth() {
    const response = await member.steamAuthLink();
    window.location.href = response;
  }

  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
  };

  const myGameList = chunkArray(myGames, 3);
  //   console.log('아 제발', chunkArray(myGames, 3));

  return (
    <main>
      <section className="wrapper pt-36 pb-16">
        <div className="flex flex-col gap-16">
          {/* 나의 정보 */}
          <div className="w-full px-8 py-9 border border-neutral-300 rounded-2xl">
            {userMe ? (
              <div className="flex gap-7 relative">
                <Avatar className="bg-neutral-400 w-24 h-24">
                  {/* <AvatarImage src={ (userMe.img_src ? (userMe.img_src) : (defauiltAvatar) )}  /> */}
                  <AvatarImage className="object-cover" src={userMe.img_src ?? defauiltAvatar} />
                </Avatar>

                <div>
                  <div className="flex gap-3">
                    {/* <p className="font-suit text-2xl font-semibold text-neutral-400">{userMe.user_title ?? defualt} </p> */}
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
                    {dummyGameArr.map((_, ind) => {
                      return (
                        <CarouselItem key={ind} className={``}>
                          <div className="grid grid-cols-3 gap-6">
                            {myGuilds?.map((guild) => <GuildHorizon key={guild.guild_name} data={guild} />)}
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
          <div>
            <p className="font-suit text-3xl font-semibold">내가 보유한 게임 목록</p>

            {/* <div className="flex gap-6">
              {myGames?.map((data) => <PopularCard key={data.gameData.appid} data={data.gameData} />)}
            </div> */}
            {/* <Swiper
                scrollbar={{ hide: true }}
                modules={[Pagination]}
                pagination={{
                  clickable:true
                  // type: undefined,
                }}
                loop={true}
                slidesPerView={1}
                className='w-full'
              >
              {myGames?.map((group, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex gap-6 min-w-full justify-center">
                    {group.map((item) => (
                      <div key={item.gameData.appid} className="w-[410px] shrink-0">
                        <PopularCard
                          // key={item.gameData?.appid}
                          data={item.gameData}
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}

            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              direction="horizontal"
              modules={[Pagination]}
              style={{ width: '100%', height: 'auto' }}
            >
              {myGames?.map((data, index) => (
                <SwiperSlide key={index}>
                  <PopularCard key={data.gameData.appid} data={data.gameData} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <Swiper
              spaceBetween={10}
              slidesPerView={3}
              direction="horizontal"
              modules={[Pagination]}
              // pagination={{
              //   // clickable: true,
              //   type: undefined,
              // }}
            >
              {myGames?.map((data, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col-3 gap-6">
                    {data.map((data) => (
                    <PopularCard key={data.gameData.appid} data={data.gameData} />
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}

            {myGames?.length === 0 && (
              <div className="text-center">
                <EmptyLottie className="w-[280px] mt-6" noText={true}>
                  <RetroButton
                    type="purple"
                    className="mt-4"
                    callback={() => {
                      router.push(PATH.game_list);
                    }}
                  >
                    게임 하러 가기!
                  </RetroButton>
                </EmptyLottie>
              </div>
            )}
          </div>

          {/* 참여중인 파티 */}
          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">참여중인 파티</p>
            <div className="flex">
              <div className="grid grid-cols-3 gap-6">
                {myParties?.map((party) => <PartyCard key={party.partyId} data={party} />)}
              </div>
            </div>
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

            <div className="grid grid-cols-3 gap-6">
              {paginatedLogs?.map((partyLog) => <PartyLogCard key={partyLog.partyId} data={partyLog} />)}

              {/* {paginatedLogs?.map((partyLog) => (
                <PartyLogCard key={partyLog.party_info.party_name} data={partyLog} />
              ))} */}
            </div>

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

            {myPartyLogs?.length !== 0 && (
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
