'use client';

import { guild } from '@/types/guild';
import GuildFullImage, { GuildFullImageSkeleton } from '../../guild/guild-fullimage';
import './style.css';
import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselItem, CarouselContent, CarouselApi } from '../../ui/carousel';
import SteamCard from '@/components/game/SteamCard';
import Link from 'next/link';

import { dummyGameSimple, dummyGuild } from '@/utils/dummyData';
import { gameSimple } from '@/types/games';

type SearchGuildWithGameProps = {
  leftCarouselTitle: ReactNode;
  className?: string;
  theme: 'light' | 'dark';
};

const guildDummyData: guild[] = [dummyGuild, dummyGuild, dummyGuild];

export default function SearchGuildWithGame(props: SearchGuildWithGameProps) {
  const [api, setApi] = useState<CarouselApi>();

  const dummyGameArr = new Array<gameSimple>(8).fill(dummyGameSimple);
  const [selectedGame, setSelectedGame] = useState<number>(0);

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
              {dummyGameArr.map((_, ind) => {
                return (
                  <CarouselItem key={ind} onClick={() => setSelectedGame(ind)} className={`basis-1/3`}>
                    <SteamCard data={dummyGameSimple} theme={props.theme} selected={selectedGame === ind} />
                  </CarouselItem>
                );
              })}
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
          <CarouselContent className="h-[572px]">
            {guildDummyData.map((e, ind) => (
              <CarouselItem key={`${e.guild_name}_${ind}`} className="basis-1/2">
                <Link href={'#'}>
                  <GuildFullImage data={e} className="" />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className={`${props.theme === 'dark' ? 'fade-overlay' : 'fade-overlay-white'} absolute w-full h-full pointer-events-none`}
        ></div>
      </div>
    </div>
  );
}
