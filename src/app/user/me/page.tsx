'use client';

import PopularCard from '@/components/game/PopularCard';
import GuildHorizon from '@/components/guild/guild-horizon';
import PartyCard from '@/components/party/PartyCard';
import PartyLogCard from '@/components/party/PartyLogCard';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { gameSimple } from '@/types/games';
import { guild } from '@/types/guild';
import { party, partyLog } from '@/types/party';
import {
  dummyGameSimple,
  dummyGuild,
  dummyParty,
  dummyPartyLog,
  dummyUserDetail,
  dummyUserSimple,
} from '@/utils/dummyData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { EditInfo } from './components/MyModal';
import SteamSVG from '@/components/svg/steam';
import Tag from '@/components/common/Tag';

export default function MyPage() {
  const dummyGuildList: guild[] = Array(3).fill(dummyGuild);
  const dummyPartyList: party[] = Array(3).fill(dummyParty);
  const dummyPartyLogList: partyLog[] = Array(6).fill(dummyPartyLog);

  const [api, setApi] = useState<CarouselApi>();

  const dummyGameArr = new Array<gameSimple>(8).fill(dummyGameSimple);
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const isSteamToken = 'abc';
  const playStyle = dummyUserDetail.party_style;
  const skillLevel = dummyUserDetail.skill_level;
  const gender = dummyUserDetail.gender;

  return (
    <main>
      <section className="wrapper pt-36">
        <div className="flex flex-col gap-16">
          <div className="w-full px-8 py-9 border border-neutral-300 rounded-2xl">
            <div className="flex gap-7 relative">
              <Avatar className="bg-neutral-400 w-24 h-24">
                <AvatarImage src={dummyUserSimple.img_src} />
              </Avatar>

              <div>
                <div className="flex gap-3">
                  <p className="font-suit text-2xl font-semibold text-neutral-400">{dummyUserSimple.user_title}</p>
                  <p className="font-suit text-2xl font-bold ">{dummyUserSimple.nickname}</p>
                </div>

                <div className="flex gap-8">
                  <div className="font-suit text-base font-semibold text-neutral-400 flex">
                    스팀 아이디 :&nbsp;
                    {isSteamToken ? (
                      <div>{dummyUserSimple.username.split('@')[0]}</div>
                    ) : (
                      <button className="flex flex-row gap-1">
                        <SteamSVG fill={'#8258ff'} stroke="" width={24} height={24} />
                        <p className="text-base font-black text-purple-400">STEAM</p>
                      </button>
                    )}
                  </div>
                  <p className="font-suit text-base font-semibold text-neutral-400"> 성별 : {dummyUserDetail.gender}</p>
                </div>

                <div className="gap-5">
                  <p className="font-suit text-2xl font-bold pt-8">{dummyUserSimple.nickname} 님의 플레이 스타일</p>

                  <div className="flex flex-col rounded-xl gap-2 py-6">
                    <div className="flex items-center gap-2">
                      <p className="w-[118px] font-dgm text-neutral-900">플레이 스타일</p>
                      <div className="flex gap-2">
                        <Tag style="retro" size="small" background="dark">
                          {playStyle}
                        </Tag>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-[118px] font-dgm text-neutral-900">게임 실력</p>
                      <Tag style="retro" size="small" background="dark">
                        {skillLevel}
                      </Tag>
                    </div>
                    <div className="flex gap-2">
                      <p className="w-[118px] font-dgm text-neutral-900">성별</p>
                      <Tag style="retro" size="small" background="dark">
                        {gender}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 right-0">
                <div className="w-full">
                  <EditInfo />
                </div>
              </div>
            </div>
          </div>

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
                        <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={``}>
                          <div className="grid grid-cols-3 gap-6">
                            {dummyGuildList.map((guild) => (
                              <GuildHorizon key={guild.guild_name} data={guild} />
                            ))}
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
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">내가 보유한 게임 목록</p>
            <div className="flex gap-6">
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
              <PopularCard data={dummyGameSimple} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">참여중인 파티</p>
            <div className="flex">
              <div className="grid grid-cols-3 gap-6">
                {dummyPartyList.map((party) => (
                  <PartyCard key={party.party_name} data={party} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-suit text-3xl font-semibold">참여한 파티 로그</p>
            <div className="grid grid-cols-3 gap-6">
              {dummyPartyLogList.map((partyLog) => (
                <PartyLogCard key={partyLog.party_info.party_name} data={partyLog} />
              ))}
            </div>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-base" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="text-base" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </main>
  );
}
