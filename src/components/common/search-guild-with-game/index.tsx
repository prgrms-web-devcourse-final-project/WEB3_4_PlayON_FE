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

  const [selectedGame, setSelectedGame] = useState<number>(-1);

  const { user } = useAuthStore();
  const member = useMembers();
  const guild = useGuild();
  const { data: MyGames, isFetched } = useQuery({
    queryKey: ['MyGames'],
    queryFn: async () => {
      return await member.GetMeGames();
    },
    staleTime: Infinity,
    enabled: user !== undefined && !props.forMain,
  });
  const {
    data: GuildSearch,
    isFetched: isGuildFetched,
    refetch: guildRefetch,
  } = useQuery({
    queryKey: ['GuildsByGame'],
    queryFn: async () => {
      if (MyGames) {
        const ret = await guild.GetGuildRecommend(MyGames[selectedGame].appid);
        while (ret && ret.length < 3) {
          ret.push(ret[0]);
        }
        return ret;
      }
      return null;
    },
    enabled: isFetched,
  });
  useEffect(() => {
    guildRefetch();
  }, [selectedGame, guildRefetch]);

  return (
    <div
      className={`w-full min-w-[1280px] flex justify-center gap-[134px] ${props.theme === 'dark' ? 'bg-purple-800' : ''} ${props.className}`}
    >
      <div className="w-[627px] flex flex-col justify-center">
        {props.leftCarouselTitle}
        <div className="h-[250px] rounded-xl mb-6" onPointerDownCapture={(e) => e.stopPropagation}>
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
              <Suspense>
                {!MyGames &&
                  !props.forMain &&
                  Array.from({ length: 8 }).map((_, ind) => {
                    return (
                      <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                        <Skeleton />
                      </CarouselItem>
                    );
                  })}
                {isFetched &&
                  MyGames &&
                  !props.forMain &&
                  MyGames.map((_, ind) => {
                    return (
                      <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                        <SteamCard data={_.gameData} theme={props.theme} selected={selectedGame === ind} />
                      </CarouselItem>
                    );
                  })}
                {props.forMain &&
                  props.dummyGames &&
                  props.dummyGames.map((_, ind) => {
                    return (
                      <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                        <SteamCard data={_} theme={props.theme} selected={selectedGame === ind} />
                      </CarouselItem>
                    );
                  })}
                {props.forMain &&
                  !props.dummyGames &&
                  Array.from({ length: 8 }).map((_, ind) => {
                    return (
                      <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                        <Skeleton />
                      </CarouselItem>
                    );
                  })}
              </Suspense>
            </CarouselContent>
          </Carousel>
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
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          orientation="vertical"
          className="w-full"
        >
          <CarouselContent className={`h-[572px]`}>
            {!isGuildFetched && !props.forMain && (
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
            )}
            {isGuildFetched &&
              GuildSearch &&
              !props.forMain &&
              GuildSearch.map((e) => (
                <CarouselItem key={`${e.guild_id}`} className="basis-1/2">
                  <Link href={GUILD_ROUTE.guild_detail(e.guild_id as unknown as string)}>
                    <GuildFullImage data={e} className="" />
                  </Link>
                </CarouselItem>
              ))}
            {props.forMain &&
              props.dummyGuilds &&
              selectedGame >= 0 &&
              props.dummyGuilds[selectedGame].map((e) => (
                <CarouselItem key={`${e.guild_id}`} className="basis-1/2">
                  <Link href={GUILD_ROUTE.guild_detail(e.guild_id as unknown as string)}>
                    <GuildFullImage data={e} className="" />
                  </Link>
                </CarouselItem>
              ))}
            {props.forMain && !props.dummyGuilds && (
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
            )}
          </CarouselContent>
        </Carousel>
        <div
          className={`${props.theme === 'dark' ? 'fade-overlay' : 'fade-overlay-white'} absolute w-full h-full pointer-events-none`}
        ></div>
      </div>
    </div>
  );
}
