'use client';

import GuildFullImage, { GuildFullImageSkeleton } from '../../guild/guild-fullimage';
import './style.css';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselItem, CarouselContent, CarouselApi } from '../../ui/carousel';
import SteamCard from '@/components/game/SteamCard';
import Link from 'next/link';

import { gameSimple } from '@/types/games';
import { useQuery } from '@tanstack/react-query';
import { useMembers } from '@/api/members';
import { useAuthStore } from '@/stores/authStore';
import { useGuild } from '@/api/guild';
import { GUILD_ROUTE } from '@/constants/routes/guild';
import { Skeleton } from '@/components/ui/skeleton';
import { guild } from '@/types/guild';
import { gamesPopularDummyData, gamesPopularDummyDataAppId } from '@/utils/dummyData';

type SearchGuildWithGameProps = {
  leftCarouselTitle: ReactNode;
  className?: string;
  theme: 'light' | 'dark';
  forMain: boolean;
  dummyGames?: gameSimple[];
  dummyGuilds?: guild[][];
};

export default function SearchGuildWithGame(props: SearchGuildWithGameProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedGame, setSelectedGame] = useState<number>(0);

  const { user, hasHydrated } = useAuthStore();
  const member = useMembers();
  const guild = useGuild();
  const { data: MyGames, refetch } = useQuery({
    queryKey: ['MyGames'],
    queryFn: async () => {
      const data = await member.GetMeGames();
      if (data && data.length > 0) {
        return data;
      }
      return gamesPopularDummyData.map((e, ind) => ({
        gameData: e,
        appid: gamesPopularDummyDataAppId[ind],
      }));
    },
    enabled: hasHydrated && user !== undefined,
  });
  const { data: GuildSearch, refetch: guildRefetch } = useQuery({
    queryKey: ['GuildsByGame'],
    queryFn: async () => {
      if (MyGames && MyGames[selectedGame].appid) {
        const ret = await guild.GetGuildRecommend(MyGames[selectedGame].appid);
        if (ret && ret.length <= 0) return [];
        while (ret && ret.length < 3) {
          ret.push(ret[0]);
        }
        return ret;
      }
      return [];
    },
    enabled: false,
  });
  useEffect(() => {
    guildRefetch();
  }, [selectedGame, guildRefetch, MyGames]);
  useEffect(() => {
    if (hasHydrated) {
      refetch();
    }
  }, [hasHydrated, refetch]);

  function GuildCardBuilder() {
    switch (true) {
      case MyGames && MyGames.length > 0 && GuildSearch && GuildSearch.length > 0:
        return GuildSearch.map((e, ind) => (
          <CarouselItem key={`${e.guild_id}_${ind}`} className="basis-1/2">
            <Link href={GUILD_ROUTE.guild_detail(e.guild_id as unknown as string)}>
              <GuildFullImage data={e} className="" />
            </Link>
          </CarouselItem>
        ));
      default:
        return (
          <>
            <CarouselItem className="basis-1/2">
              <GuildFullImageSkeleton className="" />
            </CarouselItem>
            <CarouselItem className="basis-1/2">
              <GuildFullImageSkeleton className="" />
            </CarouselItem>
            <CarouselItem className="basis-1/2">
              <GuildFullImageSkeleton className="" />
            </CarouselItem>
          </>
        );
    }
  }
  function GameCardBuilder() {
    switch (true) {
      case hasHydrated && MyGames && MyGames.length > 0:
        return MyGames.map((_, ind) => (
          <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
            <SteamCard data={_.gameData} theme={props.theme} selected={selectedGame === ind} />
          </CarouselItem>
        ));
      default:
        return Array.from({ length: 8 }).map((_, ind) => {
          return (
            <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
              <Skeleton />
            </CarouselItem>
          );
        });
    }
  }

  return (
    <div
      className={`w-full min-w-[1280px] flex justify-center gap-[134px] ${props.theme === 'dark' ? 'bg-purple-800' : ''} ${props.className}`}
    >
      <div className="w-[627px] flex flex-col justify-center">
        {!props.forMain && hasHydrated && !user && (
          <div className="text-2xl font-bold text-purple-50 mb-9">
            <p>스팀인증을 하시고 보유게임으로 길드 검색을 해보세요!</p>
          </div>
        )}
        {!props.forMain && hasHydrated && user && MyGames && MyGames.length <= 0 && (
          <div className="text-2xl font-bold text-purple-50 mb-9">
            <p>보유중인 게임이 없으시군요... 이런 게임은 어떠세요?</p>
          </div>
        )}
        {!props.forMain && hasHydrated && user && <div className="flex">{props.leftCarouselTitle}</div>}
        {props.forMain && <div className="flex">{props.leftCarouselTitle}</div>}
        <div className="h-[250px] rounded-xl mb-6" onPointerDownCapture={(e) => e.stopPropagation}>
          {hasHydrated && (
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
                {!props.forMain && GameCardBuilder()}
                {props.forMain &&
                  props.dummyGames &&
                  props.dummyGames.map((_, ind) => (
                    <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                      <SteamCard data={_} theme={props.theme} selected={selectedGame === ind} />
                    </CarouselItem>
                  ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
        <div className="flex gap-9 justify-end mt-5">
          <button
            className="h-12 w-12 bg-neutral-400 flex items-center justify-center rounded-full hover:bg-neutral-700 transition-colors"
            onClick={() => {
              console.log(api?.canScrollPrev());
              if (api?.canScrollPrev()) api.scrollPrev();
            }}
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            className="h-12 w-12 bg-neutral-400 flex items-center justify-center rounded-full hover:bg-neutral-700 transition-colors"
            onClick={() => {
              console.log(api?.canScrollNext());
              if (api?.canScrollNext()) api.scrollNext();
            }}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="w-[520px] flex items-center overflow-hidden relative">
        {hasHydrated && (
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            orientation="vertical"
            className="w-full"
          >
            <CarouselContent className={`h-[572px]`}>
              {!props.forMain && GuildCardBuilder()}
              {props.forMain &&
                props.dummyGuilds &&
                props.dummyGuilds[selectedGame].map((e) => (
                  <CarouselItem key={`${e.guild_id}`} className="basis-1/2">
                    <GuildFullImage data={e} className="" />
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        )}
        <div
          className={`${props.theme === 'dark' ? 'fade-overlay' : 'fade-overlay-white'} absolute w-full h-full pointer-events-none`}
        ></div>
      </div>
    </div>
  );
}
