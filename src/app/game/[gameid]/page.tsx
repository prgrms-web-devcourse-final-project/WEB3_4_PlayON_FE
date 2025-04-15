'use client';

import RetroButton from '@/components/common/RetroButton';
import Tag from '@/components/common/Tag';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { dummyGameDetail } from '@/utils/dummyData';
import { SwiperSlide, Swiper } from 'swiper/react';
import PartyCard from '@/components/party/PartyCard';
import 'swiper/css';
import PartyLogCard from '@/components/party/PartyLogCard';
import { PlayIcon } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { game, useGame, party as ServerParty, partyLog as ServerPartyLog } from '@/api/game';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useRouter } from 'next/navigation';
import { gameDetail } from '@/types/games';
import { getPartyRes } from '@/types/party';
import Link from 'next/link';
import { PARTY_ROUTE } from '@/constants/routes/party';
import SafeHtml from '@/components/common/SafeHtml';
import styles from './gameDetail.module.css';

export default function GameDetail({ params }: { params: { gameid: string } }) {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const router = useRouter();
  const gamehook = useGame();
  const partyResFallback: getPartyRes[] = [
    {
      appId: 730,
      description: '',
      gameName: 'Counter Strike 2',
      maximum: 10,
      members: [
        { img_src: '/img/dummy_profile.jpg', memberId: '0', nickname: '이름', user_title: '', username: '유저네임' },
      ],
      minimum: 2,
      name: '파티이름',
      partyAt: new Date(),
      partyId: 0,
      partyTags: [{ tagValue: '파티태그' }, { tagValue: '파티태그' }],
      total: 0,
    },
    {
      appId: 730,
      description: '',
      gameName: 'Counter Strike 2',
      maximum: 10,
      members: [
        { img_src: '/img/dummy_profile.jpg', memberId: '0', nickname: '이름', user_title: '', username: '유저네임' },
      ],
      minimum: 2,
      name: '파티이름',
      partyAt: new Date(),
      partyId: 0,
      partyTags: [{ tagValue: '파티태그' }, { tagValue: '파티태그' }],
      total: 0,
    },
    {
      appId: 730,
      description: '',
      gameName: 'Counter Strike 2',
      maximum: 10,
      members: [
        { img_src: '/img/dummy_profile.jpg', memberId: '0', nickname: '이름', user_title: '', username: '유저네임' },
      ],
      minimum: 2,
      name: '파티이름',
      partyAt: new Date(),
      partyId: 0,
      partyTags: [{ tagValue: '파티태그' }, { tagValue: '파티태그' }],
      total: 0,
    },
  ];

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
  function convertToClientParty(data: ServerParty, appId: number): getPartyRes {
    return {
      appId: appId,
      description: data.description,
      gameName: data.gameName,
      maximum: data.maximum,
      members: data.members.map((e) => ({
        img_src: e.profileImage,
        memberId: e.memberId.toString(),
        nickname: '',
        user_title: '',
        username: '',
      })),
      minimum: data.minimum,
      name: data.name,
      partyAt: data.partyAt,
      partyId: data.partyId,
      partyTags: data.partyTags.map((e) => ({ tagValue: e.tagValue })),
      total: 0,
    };
  }
  function convertToClientPartyLog(data: ServerPartyLog, appId: number): getPartyRes {
    return {
      appId: appId,
      description: '',
      gameName: data.gameName,
      maximum: 10,
      members: data.partyMembers.map((e) => ({
        img_src: e.profileImg,
        memberId: e.memberId.toString(),
        nickname: e.nickname,
        user_title: e.title,
        username: e.username,
      })),
      minimum: 2,
      name: data.name,
      partyAt: data.partyAt,
      partyId: data.partyId,
      partyTags: data.partyTags.map((e) => ({ tagValue: e.tagValue })),
      total: data.partyMembers.length,
    };
  }

  const { data: gameDetails } = useSuspenseQuery({
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
        return {
          game: convGame,
          partyLogs: convPartyLogs,
          parties: convParties,
        };
      }
      return {
        game: dummyGameDetail,
        parties: partyResFallback,
        partyLogs: partyResFallback,
      };
    },
  });
  // console.log('gameDetails', gameDetails);
  // const dummyReviewData = {
  //   query_summary: {
  //     num_reviews: 3,
  //     review_score: 6,
  //     review_score_desc: '대체로 긍정적',
  //     total_positive: 5173,
  //     total_negative: 1296,
  //     total_reviews: 6469,
  //   },
  //   reviews: [
  //     {
  //       recommendationid: '189310818',
  //       author: {
  //         steamid: '76561198005261723',
  //         num_games_owned: 0,
  //         num_reviews: 17,
  //         playtime_forever: 4073,
  //         playtime_last_two_weeks: 0,
  //         playtime_at_review: 372,
  //         last_played: 1742732993,
  //       },
  //       language: 'koreana',
  //       review:
  //         '[h1] 게임성은 역대 최고. 그것을 뛰어넘는 엉터리 최적화[/h1] \n\n개인적으로 생각하는 오픈월드게임의 중요한 부분은 가장 처음 게임속 세상과 풍경을 접했을때 유저에게 강렬한 인상을 주는것임.\n이번 와일즈는 "하드웨어 스펙"이 받쳐준다면 강렬한 인상을 느낄수 있지만 대다수의 유저들은 몬헌 와일즈 기준으로 최소~중급사양이 현실인데.. 더 많은 유저가 몬헌이 본래 보여주려 했던 세상을 못보는것같아 아쉬울따름.\n\n만약 캡콤의 자사엔진이 아닌 범용성과 최적화를 생각해 타사 엔진으로 와일즈를 만들었다면 더욱 큰 성공을 이루지 않았을까?\n게임성에서는 이견이 없을정도로 호평인데 엉터리 최적화라는 벽으로 인해 많은 사람이 몬헌시리즈에 입문을 포기한건 아닐까?\n\n미래에 모든 유저의 하드 스펙의 상향평준화가 된다면 와일즈가 가진 본래의 아름다움을 느낄수야 있겠지만\n그때에 다시 와일즈를 할 사람이 얼마나 있겠는가...',
  //       timestamp_created: 1741051684,
  //       timestamp_updated: 1741051710,
  //       voted_up: false,
  //       votes_up: 178,
  //       votes_funny: 6,
  //       weighted_vote_score: '0.762522101402282715',
  //       comment_count: 0,
  //       steam_purchase: true,
  //       received_for_free: false,
  //       written_during_early_access: false,
  //       primarily_steam_deck: false,
  //     },
  //     {
  //       recommendationid: '191159417',
  //       author: {
  //         steamid: '76561198850092929',
  //         num_games_owned: 0,
  //         num_reviews: 4,
  //         playtime_forever: 7949,
  //         playtime_last_two_weeks: 750,
  //         playtime_at_review: 7302,
  //         last_played: 1743860441,
  //       },
  //       language: 'koreana',
  //       review:
  //         '몬헌 신작이라 하긴 하는데 게임은 미완성이고 최적화는 거지같고 컨텐츠는 없다시피하고 원래 본편으로 나왔어야 하는 집회소 같은 걸 이제야 업뎃이라고 추가해주는척 하는거 괘씸해서 못참겠음 분노의 비추 달게 받아라',
  //       timestamp_created: 1742918412,
  //       timestamp_updated: 1742918412,
  //       voted_up: false,
  //       votes_up: 62,
  //       votes_funny: 4,
  //       weighted_vote_score: '0.702287912368774414',
  //       comment_count: 0,
  //       steam_purchase: true,
  //       received_for_free: false,
  //       written_during_early_access: false,
  //       primarily_steam_deck: false,
  //     },
  //   ],
  // };
  // const data: ChartData<'doughnut'> = {
  //   labels: ['👍', '👎'],
  //   datasets: [
  //     {
  //       data: [dummyReviewData.query_summary.total_negative, dummyReviewData.query_summary.total_positive],
  //       backgroundColor: ['#a3a3a3', '#6738f6'],
  //     },
  //   ],
  // };

  type slide = {
    contentType: 'movie' | 'screenshot';
    contentUrl: string;
  };
  const slideArray: slide[] = [
    ...(gameDetails ? gameDetails.game.movie_src.map<slide>((_) => ({ contentType: 'movie', contentUrl: _ })) : []),
    ...(gameDetails
      ? gameDetails.game.screenshot_src.map<slide>((_) => ({ contentType: 'screenshot', contentUrl: _ }))
      : []),
  ];
  const SelectedSlideBuilder = (props: { ind: number }) => {
    const selectedSlideData = slideArray[props.ind];
    return (
      <div className="border border-neutral-400">
        {selectedSlideData.contentType === 'screenshot' && <img src={selectedSlideData.contentUrl} alt="" />}
        {selectedSlideData.contentType === 'movie' && (
          <iframe src={selectedSlideData.contentUrl} className="w-full aspect-video"></iframe>
        )}
      </div>
    );
  };
  function slideSelectHandler(ind: number) {
    if (ind < 0 || ind >= slideArray.length) return;
    setSelectedSlide(ind);
  }

  return (
    <div className="flex flex-col mt-[150px]">
      <div className="flex w-[67%] min-w-[1280px] self-center gap-6">
        <div className="flex flex-col gap-7 w-[33%] min-w-[411px]">
          <div className=" w-[411px] overflow-hidden rounded-xl ">
            <img src={gameDetails.game.img_src} alt="" className="" />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-4xl text-neutral-900 font-extrabold">{gameDetails.game.title}</p>
            <div className="flex gap-2">
              <Suspense fallback={<div className="w-20 h-6 bg-neutral-300 animate-pulse rounded"></div>}>
                {gameDetails?.game.genre.map((e, ind) => {
                  return (
                    <Tag background="dark" style="retro" size="small" key={ind}>
                      {e}
                    </Tag>
                  );
                })}
              </Suspense>
            </div>
          </div>
          <p className="font-medium">{gameDetails.game.short_desc}</p>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <p className="w-20">출시일</p>
              <p>{gameDetails.game.release_date.toLocaleDateString()}</p>
            </div>
            <div className="flex">
              <p className="w-20">개발</p>
              <p>{gameDetails.game.developer}</p>
            </div>
            <div className="flex">
              <p className="w-20">발행</p>
              <p>{gameDetails.game.publisher}</p>
            </div>
            <div className="flex">
              <p className="w-20">홈페이지</p>
              <p>{gameDetails.game.homepage_url}</p>
            </div>
            <div className="flex">
              <p className="w-20">OS</p>
              <p>{gameDetails.game.os.linux ? 'linux' : ''}</p>
              <p>{gameDetails.game.os.windows ? ', windows' : ''}</p>
              <p>{gameDetails.game.os.mac ? ', mac' : ''}</p>
            </div>
          </div>
          <Link href={PARTY_ROUTE.party_create}>
            <RetroButton type="purple">파티 생성</RetroButton>
          </Link>
        </div>
        <div className="flex flex-col w-[67%] gap-2">
          <div className="w-full aspect-video">
            <SelectedSlideBuilder ind={selectedSlide} />
          </div>
          <div className="flex content-between">
            <Swiper slidesPerView={5} spaceBetween={10}>
              {slideArray.map((_, ind) => (
                <SwiperSlide key={ind} onClick={() => slideSelectHandler(ind)} className="border border-neutral-400">
                  {_.contentType === 'screenshot' && <img src={_.contentUrl} alt="" className="" />}
                  {_.contentType === 'movie' && (
                    <div className="h-full overflow-hidden">
                      <img src={gameDetails?.game.img_src} alt="" className="h-full object-cover" />
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
              {slideArray.length < 5 &&
                Array.from({ length: 5 - slideArray.length }).map((_, ind) => (
                  <SwiperSlide key={`empty_${ind}`}></SwiperSlide>
                ))}
            </Swiper>
          </div>
          <Accordion type="multiple" className="self-center w-full h-fit" defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="text-xl font-bold">이 게임에 대해서</p>
              </AccordionTrigger>
              <AccordionContent>
                <SafeHtml html={gameDetails ? gameDetails.game.about : ''} className={`${styles.ql}`} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <p className="text-xl font-bold">상세 정보</p>
              </AccordionTrigger>
              <AccordionContent>
                <SafeHtml html={gameDetails ? gameDetails.game.detail_desc : ''} className={`${styles.ql}`} />
              </AccordionContent>
            </AccordionItem>
            {/* <AccordionItem value="item-3">
              <AccordionTrigger>
                <p className="text-xl font-bold">스팀 평가</p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-6">
                  <div className="flex flex-col flex-auto">
                    <p>종합평가</p>
                    <p className="text-xl font-semibold">{dummyReviewData.query_summary.review_score_desc}</p>
                    <p className="font-bold mt-6">최근 평가</p>
                    <div className="flex gap-6 mt-2">
                      <div
                        className="w-[50%] text-ellipsis overflow-hidden border border-neutral-300 p-2 rounded"
                        dangerouslySetInnerHTML={{ __html: dummyReviewData.reviews[1].review }}
                      ></div>
                      <div
                        className="w-[50%] text-ellipsis overflow-hidden border border-neutral-300 p-2 rounded"
                        dangerouslySetInnerHTML={{ __html: dummyReviewData.reviews[1].review }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-[160px] h-[160px] flex flex-shrink-0 relative">
                    <Doughnut data={data} />
                    <div className="flex flex-col absolute top-[50%] left-[50%]" style={{ translate: '-50% -50%' }}>
                      <p className="text-center text-xl font-extrabold">
                        {dummyReviewData.query_summary.total_reviews}
                      </p>
                      <p className="text-center">reviews</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem> */}
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
              {gameDetails.parties?.map((_, ind) => (
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
              {gameDetails.partyLogs?.map((_, ind) => (
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
