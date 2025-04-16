'use client';

import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SwiperSlide, Swiper } from 'swiper/react';
import PartyCard from '@/components/party/PartyCard';
import 'swiper/css';
import PartyLogCard from '@/components/party/PartyLogCard';
import { PlayIcon } from 'lucide-react';
import { Suspense, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { game, useGame, party as ServerParty, partyLog as ServerPartyLog } from '@/api/game';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useRouter } from 'next/navigation';
import { gameDetail } from '@/types/games';
import { getMainPendingPartyRes, getPartyRes } from '@/types/party';
import Link from 'next/link';
import { PARTY_ROUTE } from '@/constants/routes/party';
import SafeHtml from '@/components/common/SafeHtml';
import styles from './gameDetail.module.css';

export default function GameDetail({ params }: { params: { gameid: string } }) {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slides = useRef<slide[]>([]);
  const router = useRouter();
  const gamehook = useGame();

  function convertToClientGame(data: game): gameDetail {
    return {
      about: data.aboutTheGame,
      detail_desc: data.aboutTheGame,
      developer: [data.developers],
      genre: data.genres,
      homepage_url: data.website,
      img_src: data.headerImage,
      movie_src: data.movies,
      screenshot_src: data.screenshots,
      os: {
        linux: data.isLinuxSupported,
        mac: data.isMacSupported,
        windows: data.isWindowsSupported,
      },
      publisher: [data.publishers],
      release_date: new Date(data.releaseDate),
      short_desc: data.shortDescription,
      title: data.name,
    };
  }
  function convertToClientParty(data: ServerParty, appId: number): getMainPendingPartyRes {
    return {
      appId: appId,
      description: data.description,
      gameName: data.gameName,
      maximum: data.maximum,
      members: data.members.map((e) => {
        return {
          memberId: e.memberId,
          profileImg: e.profileImage,
        };
      }),
      minimum: data.minimum,
      name: data.name,
      partyAt: data.partyAt.toString(),
      partyId: data.partyId,
      partyTags: data.partyTags,
      total: data.members.length,
    };
  }
  function convertToClientPartyLog(data: ServerPartyLog, appId: number): getPartyRes {
    return {
      appId: appId,
      description: '',
      gameName: data.gameName,
      hit: 0,
      maximum: 10,
      minimum: 2,
      name: data.name,
      partyAt: data.partyAt,
      partyId: data.partyId,
      partyMembers: data.partyMembers.map((e) => {
        return {
          memberId: e.memberId,
          partyMemberId: e.memberId,
          username: e.username,
          nickname: e.nickname,
          profileImg: e.profileImg,
          title: e.title,
        };
      }),
      partyTags: data.partyTags,
      total: data.partyMembers.length,
    };
  }

  const { data: gameDetails, isFetched } = useQuery({
    queryKey: ['gameDetail', params.gameid],
    queryFn: async () => {
      const gameId = parseInt(params.gameid);
      if (isNaN(gameId)) {
        router.push(GAME_ROUTE.game_list);
      }
      const data = await gamehook.GameDetailWithPartyLog(gameId);
      const convGame = convertToClientGame(data.game);
      const convParties = data.partyList.map((_) => convertToClientParty(_, data.game.appid));
      const convPartyLogs = data.partyLogList.map((_) => convertToClientPartyLog(_, data.game.appid));

      if (data) {
        slides.current = [
          ...data.game.movies.map<slide>((e) => ({ contentType: 'movie', contentUrl: e })),
          ...data.game.screenshots.map<slide>((e) => ({ contentType: 'screenshot', contentUrl: e })),
        ];
        return {
          game: convGame,
          partyLogs: convPartyLogs,
          parties: convParties,
        };
      }
      return {
        game: null,
        partyLogs: [],
        parties: [],
      };
    },
  });

  type slide = {
    contentType: 'movie' | 'screenshot';
    contentUrl: string;
  };
  const SelectedSlideBuilder = (props: { ind: number }) => {
    const selectedSlideData = slides.current[props.ind];
    return (
      <div className="border border-neutral-400">
        {selectedSlideData.contentType === 'screenshot' && <img src={selectedSlideData.contentUrl} alt="" />}
        {selectedSlideData.contentType === 'movie' && (
          <iframe
            src={`/api/steam-video-proxy?url=${encodeURIComponent(selectedSlideData.contentUrl)}`}
            className="w-full aspect-video"
            title="video"
          ></iframe>
        )}
      </div>
    );
    return <div></div>;
  };
  function slideSelectHandler(ind: number) {
    if (ind < 0 || ind >= slides.current.length) return;
    setSelectedSlide(ind);
  }

  return (
    <div className="flex flex-col mt-[150px]">
      <div className="flex w-[67%] min-w-[1280px] self-center gap-6">
        <div className="flex flex-col gap-7 w-[33%] min-w-[411px]">
          <div className=" w-[411px] overflow-hidden rounded-xl ">
            <img src={gameDetails?.game?.img_src} alt="" className="" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-4xl text-neutral-900 font-extrabold">{gameDetails?.game?.title}</p>
            <div className="flex gap-2">
              <Suspense fallback={<div className="w-20 h-6 bg-neutral-300 animate-pulse rounded"></div>}>
                {gameDetails?.game?.genre.map((e, ind) => {
                  return (
                    <Tag background="dark" style="retro" size="small" key={ind}>
                      {e}
                    </Tag>
                  );
                })}
              </Suspense>
            </div>
          </div>
          <p className="font-medium">{gameDetails?.game?.short_desc}</p>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <p className="w-20">출시일</p>
              <p>{gameDetails?.game?.release_date.toLocaleDateString()}</p>
            </div>
            <div className="flex">
              <p className="w-20">개발</p>
              <p>{gameDetails?.game?.developer}</p>
            </div>
            <div className="flex">
              <p className="w-20">발행</p>
              <p>{gameDetails?.game?.publisher}</p>
            </div>
            <div className="flex">
              <p className="w-20">홈페이지</p>
              <p>{gameDetails?.game?.homepage_url}</p>
            </div>
            <div className="flex">
              <p className="w-20">OS</p>
              <p>{gameDetails?.game?.os.linux ? 'linux' : ''}</p>
              <p>{gameDetails?.game?.os.windows ? ', windows' : ''}</p>
              <p>{gameDetails?.game?.os.mac ? ', mac' : ''}</p>
            </div>
          </div>
          <Link href={PARTY_ROUTE.party_create}>
            <RetroButton type="purple">파티 생성</RetroButton>
          </Link>
        </div>
        <div className="flex flex-col w-[67%] gap-2">
          {isFetched && (
            <>
              <div className="w-full aspect-video">
                <SelectedSlideBuilder ind={selectedSlide} />
              </div>
              <div className="flex content-between">
                <Swiper slidesPerView={5} spaceBetween={10}>
                  {slides.current.map((_, ind) => (
                    <SwiperSlide
                      key={ind}
                      onClick={() => slideSelectHandler(ind)}
                      className="border border-neutral-400"
                    >
                      {_.contentType === 'screenshot' && <img src={_.contentUrl} alt="" className="" />}
                      {_.contentType === 'movie' && (
                        <div className="h-full overflow-hidden">
                          <img src={gameDetails?.game?.img_src} alt="" className="h-full object-cover" />
                          <div
                            className="absolute top-[50%] left-[50%] rounded-full bg-[#00000080] p-2 flex items-center justify-center"
                            style={{ translate: '-50% -50%' }}
                          >
                            <PlayIcon className="text-white" />
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                  {slides.current.length < 5 &&
                    Array.from({ length: 5 - slides.current.length }).map((_, ind) => (
                      <SwiperSlide key={`empty_${ind}`}></SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </>
          )}
          <Accordion type="multiple" className="self-center w-full h-fit" defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="text-xl font-bold">이 게임에 대해서</p>
              </AccordionTrigger>
              <AccordionContent>
                <SafeHtml
                  html={gameDetails && gameDetails.game ? gameDetails.game.about : ''}
                  className={`${styles.ql}`}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <p className="text-xl font-bold">상세 정보</p>
              </AccordionTrigger>
              <AccordionContent>
                <SafeHtml
                  html={gameDetails && gameDetails.game ? gameDetails.game.detail_desc : ''}
                  className={`${styles.ql}`}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Accordion type="multiple" className="w-[67%] min-w-[1280px] self-center mt-24 mb-36">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-xl font-bold">이 게임의 파티리스트</p>
          </AccordionTrigger>
          <AccordionContent>
            <Swiper spaceBetween={10} slidesPerView={3} direction="horizontal">
              {gameDetails?.parties?.map((_, ind) => (
                <SwiperSlide key={ind} className="w-[410px]">
                  <PartyCard data={_} />
                </SwiperSlide>
              ))}
            </Swiper>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <p className="text-xl font-bold">이 게임의 파티로그</p>
          </AccordionTrigger>
          <AccordionContent>
            <Swiper spaceBetween={10} slidesPerView={3} direction="horizontal">
              {gameDetails?.partyLogs?.map((_, ind) => (
                <SwiperSlide key={ind} className="w-[410px]">
                  <Link href={PARTY_ROUTE.party_log(_.partyId)}>
                    <PartyLogCard data={_} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
